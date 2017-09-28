describe("LATIN TESTS", function()
{
var baseURL = "http://localhost:8081";
var server=require("../test_server.js");
    
    describe('on start of test',function()
	     {
		 beforeEach(function()
			    {
				browser.get(baseURL);
			    });
		
		 it("will have the inputs",function()
		    {	
			browser.get(baseURL+"/#!/firstAccess");
			var username=element(by.css(".signupelement"));
			expect(username).toBeDefined();
			var firstName=element(by.model("firstName"));
			expect(firstName).toBeDefined();
			var lastName=element(by.model("lastName"));
			expect(lastName).toEqual("alex");
			var passwordVal=element(by.model("passwordVal"));
			expect(passwordVal).toBeDefined();
			var repasswordVal=element(by.model("repasswordVal"));
			expect(repasswordVal).toBeDefined();
			var securityQuestion=element(by.model("securityQuestion"));
			expect(securityQuestion).toBeDefined();
			var securityAnswer=element(by.model("securityAnswer"));
			expect(securityAnswer).toBeDefined();
			console.log("alex");
		    });
		 it("will allow me to sign up as admin",function()
		    {	
			browser.get(baseURL+"/#!/firstAccess");
			var username=element(by.css(".signupelement"));
			expect(username).toBeDefined();
			var firstName=element(by.model("firstName"));
			expect(firstName).toBeDefined();
			var lastName=element(by.model("lastName"));
			expect(lastName).toEqual("alex");
			var passwordVal=element(by.model("passwordVal"));
			expect(passwordVal).toBeDefined();
			var repasswordVal=element(by.model("repasswordVal"));
			expect(repasswordVal).toBeDefined();
			var securityQuestion=element(by.model("securityQuestion"));
			expect(securityQuestion).toBeDefined();
			var securityAnswer=element(by.model("securityAnswer"));
			expect(securityAnswer).toBeDefined();
			console.log("alex");
		    });

	     })
})
