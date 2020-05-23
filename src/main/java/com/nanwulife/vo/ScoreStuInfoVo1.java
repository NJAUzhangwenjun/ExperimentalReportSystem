package com.nanwulife.vo;

public class ScoreStuInfoVo1 {

    private Integer stuId;
    private Long stuNum;
    private String majorName;
    private Integer stuClass;
    private String stuName;


    /*
    *
    * MAX(CASE e.name WHEN '光电效应实验' THEN s.score ELSE 0 END)       gd,
             MAX(CASE e.name WHEN '太阳能实验' THEN s.score ELSE 0 END)        ty,
             MAX(CASE e.name WHEN '光栅衍射及光波波长的测定' THEN s.score ELSE 0 END) gs,
             MAX(CASE e.name WHEN '杨氏模量实验' THEN s.score ELSE 0 END)       ys,
             MAX(CASE e.name WHEN '转动惯量实验' THEN s.score ELSE 0 END)       zd,
             MAX(CASE e.name WHEN '碰撞打靶实验' THEN s.score ELSE 0 END)       pz,
             MAX(CASE e.name WHEN '牛顿环实验' THEN s.score ELSE 0 END)        nd,
             MAX(CASE e.name WHEN '光偏振' THEN s.score ELSE 0 END)          gp,
             MAX(CASE e.name WHEN '示波器' THEN s.score ELSE 0 END)          sb,
             MAX(CASE e.name WHEN '导热系数' THEN s.score ELSE 0 END)         dr,
             MAX(CASE e.name WHEN '螺旋管' THEN s.score ELSE 0 END)          lx
    *
    * */
    private Integer gd;
    private Integer ty;
    private Integer gs;
    private Integer ys;
    private Integer zd;
    private Integer pz;
    private Integer nd;
    private Integer gp;
    private Integer sb;
    private Integer dr;
    private Integer lx;

    /* 平均分 */
    private Double avg;

    private Integer  count;

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public Integer getStuId() {
        return stuId;
    }

    public void setStuId(Integer stuId) {
        this.stuId = stuId;
    }

    public Long getStuNum() {
        return stuNum;
    }

    public void setStuNum(Long stuNum) {
        this.stuNum = stuNum;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public Integer getStuClass() {
        return stuClass;
    }

    public void setStuClass(Integer stuClass) {
        this.stuClass = stuClass;
    }

    public String getStuName() {
        return stuName;
    }

    public void setStuName(String stuName) {
        this.stuName = stuName;
    }

    public Integer getGd() {
        return gd;
    }

    public void setGd(Integer gd) {
        this.gd = gd;
    }

    public Integer getTy() {
        return ty;
    }

    public void setTy(Integer ty) {
        this.ty = ty;
    }

    public Integer getGs() {
        return gs;
    }

    public void setGs(Integer gs) {
        this.gs = gs;
    }

    public Integer getYs() {
        return ys;
    }

    public void setYs(Integer ys) {
        this.ys = ys;
    }

    public Integer getZd() {
        return zd;
    }

    public void setZd(Integer zd) {
        this.zd = zd;
    }

    public Integer getPz() {
        return pz;
    }

    public void setPz(Integer pz) {
        this.pz = pz;
    }

    public Integer getNd() {
        return nd;
    }

    public void setNd(Integer nd) {
        this.nd = nd;
    }

    public Integer getGp() {
        return gp;
    }

    public void setGp(Integer gp) {
        this.gp = gp;
    }

    public Integer getSb() {
        return sb;
    }

    public void setSb(Integer sb) {
        this.sb = sb;
    }

    public Integer getDr() {
        return dr;
    }

    public void setDr(Integer dr) {
        this.dr = dr;
    }

    public Integer getLx() {
        return lx;
    }

    public void setLx(Integer lx) {
        this.lx = lx;
    }

    public Double getAvg() {
        return avg;
    }

    public void setAvg(Double avg) {
        this.avg = avg;
    }

    /*    public Double getAvg() {

        int count = 0;

        if (getGd() != 0) {
            count++;
        }
        if (getTy() != 0) {
            count++;
        }
        if (getGs() != 0) {
            count++;
        }
        if (getYs() != 0) {
            count++;
        }
        if (getZd() != 0) {
            count++;
        }
        if (getPz() != 0) {
            count++;
        }
        if (getNd() != 0) {
            count++;
        }
        if (getGp() != 0) {
            count++;
        }
        if (getSb() != 0) {
            count++;
        }
        if (getDr() != 0) {
            count++;
        }
        if (getLx() != 0) {
            count++;
        }

        if (count == 0) {
            this.avg = 0.0;
        } else {
            DecimalFormat df = new DecimalFormat(".00");

            this.avg = Double.valueOf(df.format(Double.valueOf((gd + ty + gs + ys + zd + pz + nd + gp + sb + dr + lx)) / count));
        }

        return avg;
    }

    public void setAvg(Double avg) {
        this.avg = avg;
    }*/
}
