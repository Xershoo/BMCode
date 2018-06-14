package com.class8.eduPlatform.core.service;

import java.util.List;
import com.class8.user.bean.SchoolBanner;

public interface ISchoolBannerService {
	
	public List<SchoolBanner> listSchoolBanner(long schoolId);
	
}
