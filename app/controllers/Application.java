package controllers;

import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import utils.Secured;

public class Application extends Controller {
	
	public static String allowedURLs = "http://localhost:8000";
	
	@Security.Authenticated(Secured.class)
	public static Result index(){
		AllowOrigin();
		return ok("success");
	}
	
	public static Result options(String path){
		AllowOrigin();
		return ok("options");
	}
	
	public static void AllowOrigin(){
		response().setHeader("Access-Control-Allow-Origin", allowedURLs);
		response().setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		response().setHeader("Access-Control-Max-Age", "300");
		response().setHeader("Access-Control-Allow-Credentials", "true");
		response().setHeader("Access-Control-Allow-Headers", "accept, origin, x-requested-with, content-type"); 
	}
	

}