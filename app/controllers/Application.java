package controllers;

import java.util.HashMap;
import java.util.Map;

import com.github.kevinsawicki.http.HttpRequest;

import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import utils.Secured;

public class Application extends Controller {
	
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
		System.out.println(request().getHeader("origin"));
		response().setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
		response().setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		response().setHeader("Access-Control-Max-Age", "300");
		response().setHeader("Access-Control-Allow-Credentials", "true");
		response().setHeader("Access-Control-Allow-Headers", "accept, origin, x-requested-with, content-type"); 
	}
	

}