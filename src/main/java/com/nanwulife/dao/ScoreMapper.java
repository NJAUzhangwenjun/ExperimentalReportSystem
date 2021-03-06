package com.nanwulife.dao;

import com.nanwulife.pojo.Score;
import com.nanwulife.vo.ScoreStuInfoVo;
import com.nanwulife.vo.ScoreStuInfoVo1;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface ScoreMapper {
    int deleteByPrimaryKey(Score key);

    int insert(Score record);

    int insertSelective(Score record);

    Score selectByPrimaryKey(Score key);

    int updateByPrimaryKeySelective(Score record);

    int updateByPrimaryKey(Score record);

    List<ScoreStuInfoVo> getScoreListByStunum(@Param("userId") Long userId, @Param("expId") Integer expId, @Param("isExport") Integer isExport, @Param("path") String path);

    List<ScoreStuInfoVo> getScoreListByMajor(@Param("majorId") Integer majorId, @Param("stuClass") Integer stuClass, @Param("expId") Integer expId, @Param("isExport") Integer isExport, @Param("orderBy") String orderBy, @Param("path") String path);

    List<ScoreStuInfoVo1> getScoreListByMajor1(@Param("majorId") Integer majorId, @Param("stuClass") Integer stuClass, @Param("expId") Integer expId, @Param("isExport") Integer isExport, @Param("orderBy") String orderBy);

}
