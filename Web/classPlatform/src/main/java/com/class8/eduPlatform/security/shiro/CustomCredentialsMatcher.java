package com.class8.eduPlatform.security.shiro;

import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {
	
	@Override
	public boolean doCredentialsMatch(AuthenticationToken token,AuthenticationInfo info) {
		Object tokenCredentials = String.valueOf((char[])token.getCredentials());
        Object accountCredentials = getCredentials(info);  
		return equals(tokenCredentials, accountCredentials);
	}
	
}
