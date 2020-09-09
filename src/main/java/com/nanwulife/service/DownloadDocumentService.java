package com.nanwulife.service;

import java.io.File;
import java.util.zip.ZipOutputStream;

/**
 * @Description: 文件打包批量下载
 * @author 张文军
 * @Company: njauit.cn
 * @version: 1.0
 * @date 2020/9/821:10
 */
public interface DownloadDocumentService {

	/**
	 * 获取文件路径
	 * @return
	 */
	public String getFileDownloadPath();


	/**
	 * 压缩打包文件
	 * @param sourceFilePath 需要打包的文件路径
	 * @return 打包后的文件路径
	 * @throws Exception
	 */
	public String coppressFiles(String sourceFilePath);

	/**
	 * 打包压缩文件
	 * @param f
	 * @param baseDir
	 * @param zos
	 */
	public void compress(File f, String baseDir, ZipOutputStream zos);
}
