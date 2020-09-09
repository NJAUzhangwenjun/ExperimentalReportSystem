package com.nanwulife.service.impl;

import com.nanwulife.service.DownloadDocumentService;
import com.nanwulife.util.PropertiesUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * @Description: 文件批量下载
 * @author 张文军
 * @Company: njauit.cn
 * @version: 1.0
 * @date 2020/9/821:13
 */
@Service("downloadDocumentService")
public class DownloadDocumentServiceImpl implements DownloadDocumentService {
	Logger logger = LoggerFactory.getLogger(this.getClass());
	/**
	 * 需要打包下载的顶级文件夹路径
	 */
	private String fileDownloadPath;

	/**
	 * 获取文件路径
	 * @return
	 */
	@Override
	public String getFileDownloadPath() {
		if (System.getProperty("os.name").toLowerCase().contains("linux")) {
			fileDownloadPath = new PropertiesUtil("server.properties").readProperty("report.server.linux.fileDownPath");
		} else if (System.getProperty("os.name").toLowerCase().contains("mac")) {
			fileDownloadPath = new PropertiesUtil("server.properties").readProperty("report.server.macos.fileDownPath");
		} else {
			fileDownloadPath = new PropertiesUtil("server.properties").readProperty("report.server.win.fileDownPath");
		}
		logger.error("fileDownloadPath = " + fileDownloadPath);
		File file = new File(fileDownloadPath + ".zip");

		/**
		 * 删除上次已经存在的文件
		 */
		if (file.exists()) {
			file.delete();
		}
		logger.error("fileDownloadPath = " + fileDownloadPath);
		return fileDownloadPath;
	}

	/**
	 * 压缩打包文件
	 * @param sourceFilePath 需要打包的文件路径
	 * @return 打包后的文件路径
	 */
	@Override
	public String coppressFiles(String sourceFilePath) {

		File sourceDir = new File(sourceFilePath);
		File zipFile = new File(sourceFilePath + ".zip");
		ZipOutputStream zos = null;
		try {
			zos = new ZipOutputStream(new FileOutputStream(zipFile));
			String baseDir = "physicsExperimentSystem/";
			compress(sourceDir, baseDir, zos);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (zos != null) {

				try {
					zos.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return sourceFilePath + ".zip";
	}

	/**
	 * 打包压缩文件
	 * @param f
	 * @param baseDir
	 * @param zos
	 */
	@Override
	public void compress(File f, String baseDir, ZipOutputStream zos) {
		if (!f.exists()) {
			logger.error("待压缩的文件目录或文件" + f.getName() + "不存在");
			return;
		}

		File[] fs = f.listFiles();
		BufferedInputStream bis = null;
		//ZipOutputStream zos = null;
		byte[] bufs = new byte[1024 * 10];
		FileInputStream fis = null;


		try {
			//zos = new ZipOutputStream(new FileOutputStream(zipFile));
			for (int i = 0; i < fs.length; i++) {
				String fName = fs[i].getName();
				logger.error("压缩：" + baseDir + fName);
				if (fs[i].isFile()) {
					ZipEntry zipEntry = new ZipEntry(baseDir + fName);
					zos.putNextEntry(zipEntry);
					//读取待压缩的文件并写进压缩包里
					fis = new FileInputStream(fs[i]);
					bis = new BufferedInputStream(fis, 1024 * 10);
					int read = 0;
					while ((read = bis.read(bufs, 0, 1024 * 10)) != -1) {
						zos.write(bufs, 0, read);
					}
					//如果需要删除源文件，则需要执行下面2句
					//fis.close();
					//fs[i].delete();
				} else if (fs[i].isDirectory()) {
					compress(fs[i], baseDir + fName + "/", zos);
				}
			}//end for
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			//关闭流
			try {
				if (null != bis)
					bis.close();
				//if(null!=zos)
				//zos.close();
				if (null != fis)
					fis.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

	}
}
