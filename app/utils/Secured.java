package utils;

import java.util.Date;

import controllers.Application;

import models.Login;
import play.Logger;
import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;
import uk.co.panaxiom.playjongo.PlayJongo;

public class Secured extends Security.Authenticator {

	public static long twentyMinutesInMiliseconds = 1200000;
	
	@Override
	public String getUsername(Context ctx) {
		return ctx.session().get("username");
	}
	
	public static Login getLoginUser(Context ctx){
		String username = ctx.session().get("username");
		String query = String.format("{username: '%s'}", username);
		return PlayJongo.getCollection(Login.collectionName).findOne(query).as(Login.class);
	}

	@Override
	public Result onUnauthorized(Context ctx) {
		AllowOrigin(ctx);
		return unauthorized("unauthorized");
	}
	
	public static boolean isLoggedIn(Context ctx){
		if(getLoginUser(ctx) != null){
			return true;
		}
		return false;
	}
	
	public static void renewLogin(Context ctx){
		if(ctx.session().containsKey("loggedInTimer")){
			if(new Date().getTime() - (Long.parseLong(ctx.session().get("loggedInTimer"))) > twentyMinutesInMiliseconds){
				ctx.session().remove("username");
				ctx.session().remove("role");
				ctx.session().remove("school");
				Logger.info("Logging out because online timer passed: "+ (new Date().getTime() - (Long.parseLong(ctx.session().get("loggedInTimer")))) );
				ctx.session().remove("loggedInTimer");
				return;
			}
		}
		ctx.session().put("loggedInTimer", new Date().getTime()+"");
	}

	public static void AllowOrigin(Context ctx){
		System.out.println(ctx.request().getHeader("origin"));
		ctx.response().setHeader("Access-Control-Allow-Origin", Application.allowedURLs);
		ctx.response().setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		ctx.response().setHeader("Access-Control-Max-Age", "300");
		ctx.response().setHeader("Access-Control-Allow-Credentials", "true");
		ctx.response().setHeader("Access-Control-Allow-Headers", "accept, origin, x-requested-with, content-type"); 
	}
}
