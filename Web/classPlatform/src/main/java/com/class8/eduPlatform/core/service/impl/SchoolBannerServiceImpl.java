package com.class8.eduPlatform.core.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.class8.course.webservice.intf.IEduCourseService;
import com.class8.eduPlatform.core.constant.SystemConfigs;
import com.class8.eduPlatform.core.service.ISchoolBannerService;
import com.class8.user.bean.SchoolBanner;
import com.class8.user.webservice.intf.IEduUserService;

@Service
@Transactional
public class SchoolBannerServiceImpl implements ISchoolBannerService {
	
	@Autowired
	private IEduUserService eduUserService;
	
	@Autowired
	private IEduCourseService eduCourserService;

	@Override
	public List<SchoolBanner> listSchoolBanner(long schoolId) {
		List<SchoolBanner> schoolBanners = eduUserService.listSchoolBannerBySchoolId(schoolId);
		if(schoolBanners != null && schoolBanners.size()>0){
			for (SchoolBanner schoolBanner : schoolBanners) {
				schoolBanner.setBannerUrl(SystemConfigs.PIC_URL_PERFIX + schoolBanner.getBannerUrl());
			}
		}
		return schoolBanners;
	}

}
