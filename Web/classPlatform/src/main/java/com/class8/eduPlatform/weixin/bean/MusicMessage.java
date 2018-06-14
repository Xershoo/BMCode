package com.class8.eduPlatform.weixin.bean;

/**
 * 音乐消息
 * 
 * @author guopengfei
 * @date 2016-04-29
 */

public class MusicMessage extends BaseMessage {
	// 音乐
	private Music Music;

	public Music getMusic() {
		return Music;
	}

	public void setMusic(Music music) {
		Music = music;
	}

}
