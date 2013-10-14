package api;

import static controllers.Application.AllowOrigin;
import models.ChangePwModel;
import models.Login;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

public class LoginApi extends Controller {

	public static Result login() {
		AllowOrigin();
		Form<Login> loginForm = form(Login.class).bindFromRequest();
		if(loginForm.hasErrors()){
			return badRequest(loginForm.errorsAsJson());
		}else{
			session("authenticated", "true");
			session("username", loginForm.get().getUsername());
			return ok("success");
		}
	}
	
	public static Result logout(){
		AllowOrigin();
		session().clear();
		return ok("success");
	}

	public static Result changePw(){
		AllowOrigin();
		Form<ChangePwModel> changePwForm= form(ChangePwModel.class).bindFromRequest();
		if(!changePwForm.hasErrors()){
			ChangePwModel changePwModel = changePwForm.get();
			if(Login.changePassword(session().get("username"), changePwModel.getOldpassword(), changePwModel.getNewpassword())){
				return ok("success");
			}else{
				changePwForm.reject("oldpassword", "wrong old password");
			}
		}			
		return badRequest(changePwForm.errorsAsJson());
	}
}
