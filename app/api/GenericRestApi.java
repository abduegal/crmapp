package api;

import static controllers.Application.AllowOrigin;

import java.util.Arrays;
import java.util.HashMap;

import models.Account;
import models.Company;
import models.Email;
import models.Order;
import models.Product;
import models.Supplier;
import play.data.Form;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import uk.co.panaxiom.playjongo.PlayJongo;
import utils.DeletableModel;
import utils.Model;
import utils.Secured;

@SuppressWarnings({"unchecked", "rawtypes"})
@Security.Authenticated(Secured.class)
public class GenericRestApi extends Controller{

	private static HashMap<String, Class> collections = new HashMap<String, Class>();
	
	private static Class checkCollections(String collectionName){
		collections.put("product", Product.class);
		collections.put("account", Account.class);
		collections.put("company", Company.class);
		collections.put("supplier", Supplier.class);
		collections.put("order", Order.class);
		collections.put("email", Email.class);
		return collections.get(collectionName);
	}
	
	private static boolean deletables(String collectionName){
		return Arrays.binarySearch(new String[]{
			"account",
			"product",
			"supplier",
			"order"
		}, collectionName) != -1;
	}
		
	public static Result query(String collectionName){
		AllowOrigin();
		return ok(Json.toJson(PlayJongo.getCollection(collectionName).find().as(checkCollections(collectionName))));
	}
	
	public static Result get(String collectionName, String id){
		AllowOrigin();
		String query = String.format("{_id: '%s'}", id);
		Model m = (Model)PlayJongo.getCollection(collectionName).findOne(query).as(checkCollections(collectionName));
		if(m == null){
			return badRequest();
		}
		return ok(Json.toJson(m));
	}
	
	public static Result post(String collectionName){
		AllowOrigin();
		Form<Model> form = form(checkCollections(collectionName)).bindFromRequest();
		if(form.hasErrors()){
			return badRequest(form.errorsAsJson());
		}else{
			form.get().save();
			return ok("success");
		}
	}
	
	public static Result put(String collectionName, String id){
		AllowOrigin();
		Form<Model> form = form(checkCollections(collectionName)).bindFromRequest();
		if(form.hasErrors()){
			return badRequest(form.errorsAsJson());
		}else{
			form.get().update();
			return ok("success");
		}
	}
	
	public static Result delete(String collectionName, String id){
		AllowOrigin();
		String query = String.format("{_id: '%s'}", id);
		if(deletables(collectionName)){
			DeletableModel model = (DeletableModel)PlayJongo.getCollection(collectionName).findOne(query).as(checkCollections(collectionName));
			model.delete();
			return ok("success");
		}
		return badRequest();
	}
}
