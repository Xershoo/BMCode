package com.class8.eduPlatform.common.exception;
/**
 * Service公用的异常，当Service业务不满足时可以抛出该异常，抛出该异常，也相当于方法的的一个返回值.
 * 
 * 继承自Exception
 * 
 */
public class BusinessException extends Exception {
	
	private static final long serialVersionUID = 8289650331234391629L;

	public BusinessException() {
		super();
	}

	public BusinessException(String message) {
		super(message);
	}

	public BusinessException(Throwable cause) {
		super(cause);
	}

	public BusinessException(String message, Throwable cause) {
		super(message, cause);
	}
	
}
