import { Control } from '@angular/common';

export class AuthenticationService {
	
	static emailValidator(control: Control) {
      var EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

	  if (!EMAIL_REGEXP.test(control.value)) {
        return {"emailnotvalid": true};
      }
    }
	
	static passwordValidator(control: Control) {
	  var PASSWORD_REGEXP = /^.{4,}$/;
	  
	  if (!PASSWORD_REGEXP.test(control.value)) {
		return {"passwordnotvalid": true};
	  }  
	}
	
}