package com.nanwulife.controller.backend;

import com.nanwulife.service.DownloadDocumentService;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import java.io.File;

/**
 * @Description: 文件批量打包压缩下载
 * @author 张文军
 * @Company: njauit.cn
 * @version: 1.0
 * @date 2020/9/815:55
 */
@Scope("prototype")
@Controller
@RequestMapping("/downloadFile")
@SessionAttributes("downloadFile")
public class DownloadDocumentFilesController {
	Logger logger = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private DownloadDocumentService downloadDocumentService;

	@RequestMapping("download")
	public ResponseEntity<byte[]> download() throws Exception {
		String fileDownloadPath = downloadDocumentService.getFileDownloadPath();
		String path = downloadDocumentService.coppressFiles(fileDownloadPath);
		File file = new File(path);
		HttpHeaders headers = new HttpHeaders();
		/**
		 * //为了解决中文名称乱码问题
		 */
		String fileName = new String(path.substring(path.lastIndexOf("/")).getBytes("UTF-8"), "iso-8859-1");
		headers.setContentDispositionFormData("attachment", fileName);
		headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file), headers, HttpStatus.CREATED);
	}

}
