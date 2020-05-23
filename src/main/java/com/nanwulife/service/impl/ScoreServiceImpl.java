package com.nanwulife.service.impl;

import com.nanwulife.common.Const;
import com.nanwulife.common.ServerResponse;
import com.nanwulife.dao.ScoreMapper;
import com.nanwulife.pojo.Score;
import com.nanwulife.service.IScoreService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;


/**
 * @Project: ExperimentalReportSystem
 * @Description: 分数Service层
 * @Author: Cenjie Creams
 * @Date: Created in 2018/9/14
 */
@Service("iScoreService")
public class ScoreServiceImpl implements IScoreService {

    private static final Logger logger = LoggerFactory.getLogger(ScoreServiceImpl.class);
    @Autowired
    ScoreMapper scoreMapper;

    @Override
    public ServerResponse isStuHaveScore(Integer expId, Integer userId) {
        Score score = new Score();
        score.setStuId(userId);
        score.setExpId(expId);
        Score response = scoreMapper.selectByPrimaryKey(score);
        if (response == null) {
            //分数表中无记录，用户没提交过
            return ServerResponse.createBySuccess();
        }
        return ServerResponse.createByErrorCodeMessage(Const.ResponseCode.SCORE_ALREADY_EXITS.getCode(), Const.ResponseCode.SCORE_ALREADY_EXITS.getDesc());
    }

    @Override
    public ServerResponse submit(Score record) {
        scoreMapper.insert(record);
        return ServerResponse.createBySuccess();
    }

    @Override
    public ServerResponse deleteScore(Integer stuId, Integer expId) {
        Score score = new Score();
        score.setExpId(expId);
        score.setStuId(stuId);
        int count = scoreMapper.deleteByPrimaryKey(score);
        if (count == 0) {
            return ServerResponse.createByError();
        }
        return ServerResponse.createBySuccess();
    }

    @Override
    public ServerResponse getScoreListByStunum(Long userId, Integer expId, Integer isExport) {
        String basePath = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        Date date = new Date();
        String filename = sdf.format(date) + ".xls";
        if (isExport == 1) {
            if (System.getProperty("os.name").toLowerCase().contains("linux")) {
                basePath = "/var/lib/mysql-files/";
            } else {
                basePath = "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/";
            }
        }
        return ServerResponse.createBySuccess(scoreMapper.getScoreListByStunum(userId, expId, isExport, basePath + filename));
    }

    @Override
    public ServerResponse getScoreListByMajor(Integer majorId, Integer stuClass, Integer expId, Integer isExport, String orderBy) {
        String basePath = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        Date date = new Date();
        String filename = sdf.format(date) + ".xls";
        if (orderBy.equals("stu_num_asc"))
            orderBy = "stu_num asc";
        else
            orderBy = orderBy.replace("_", " ");
        System.out.println(orderBy);
        if (isExport == 1) {
            if (System.getProperty("os.name").toLowerCase().contains("linux")) {
                basePath = "/var/lib/mysql-files/";
            } else {
                basePath = "C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/";
            }
        }
        System.out.println(basePath + filename);
        return ServerResponse.createBySuccess(scoreMapper.getScoreListByMajor(majorId, stuClass, expId, isExport, orderBy, basePath + filename));

    }


    /**
     * 组合查询（平均分）
     *
     * @param majorId
     * @param stuClass
     * @param expId
     * @param isExport
     * @param orderBy
     * @return
     */
    @Override
    public ServerResponse getScoreListByMajor1(Integer majorId, Integer stuClass, Integer expId, Integer isExport, String orderBy) {

        return ServerResponse.createBySuccess(scoreMapper.getScoreListByMajor1(majorId, stuClass, expId, isExport, orderBy));

    }


}
