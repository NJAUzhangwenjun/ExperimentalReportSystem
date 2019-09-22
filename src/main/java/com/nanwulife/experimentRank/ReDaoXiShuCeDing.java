package com.nanwulife.experimentRank;

/**
 * @author 张文军
 * @Description:10判分类
 * @Company:南京农业大学工学院
 * @version:1.0
 * @date 2019/8/2020:32
 */
public class ReDaoXiShuCeDing {
    /**
     * 总分数
     */
    private int score = 0;
    /**
     * 正确答案
     */
    private String[] choices = {"C", "A", "A", "B", "B", "C", "A", "D", "C", "A","random"};
    /**
     * 学生所选的选项答案
     */
    private String[] choice = new String[11];
    /**
     * 每个选项的得分（每个选项的 4 分）
     */
    private int[] choiceScore = {4};


    /**
     * 分数不定
     */
    private float[] blanks = {0};
    /**
     * 学生所填的答案  new double[50]
     */
    private float[] blank = new float[57];
    /**
     * 每个选项的得分
     */
    private int[] blankScore = {3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4};


    public ReDaoXiShuCeDing(String[] choice, String[] blank) {
        /**
         * 接收参数
         */

        for (int i = 0; i < choice.length; i++) {
            this.choice[i] = choice[i];
        }

        for (int i = 0; i < blank.length; i++) {
            if (blank[i].isEmpty() || blank[i].equals("NaN") || blank[i] == "" || i == 55) {
                blank[i] = "-1";
            }
            this.blank[i] = Float.parseFloat(blank[i]);
        }

    }

    public int getScore() {

        /**
         * 选择题得分
         */
        for (int i = 0; i < choices.length; i++) {
            if (choices[i].equals(choice[i]) || choices[i].equals("random")) {
                if (i == 0 || i == 1) {
                    score = score + 2;
                }else if (i == 10 ) {
                    score = score + 0;
                } else {
                    score = score + choiceScore[0];
                }
            }
        }
        /**
         * 填空题 1、(30分)样品1导热系数测量
         */
        if (blank[6] >= 5 || blank[6] <= 10) {
            score = score + 5;
        }
        if (blank[13] >= 110 || blank[13] <= 130) {
            score = score + 5;
        }

        if (blank[14] >= blank[15]) {
            score = score + 5;
        }

        Boolean flag1 = true;
        for (int i = 0; i < 5; i++) {
            if (blank[i + 16] + 30 == blank[i + 17]) {
                flag1 = true;
            }
        }
        if (flag1) {
            score = score + 5;
        }


        if (blank[25] <= blank[15] && blank[15] <= blank[21]) {
            score = score + 10;
        }

        /**
         * 2、(25分)样品2导热系数测量
         */

        if (blank[33] >= 5 || blank[33] <= 10) {
            score = score + 5;
        }
        if (blank[40] >= 110 || blank[40] <= 130) {
            score = score + 5;
        }

        Boolean flag2 = true;
        for (int i = 0; i < 5; i++) {
            if (blank[i + 43] + 30 == blank[i + 44]) {
                flag2 = true;
            }
        }
        if (flag2) {
            score = score + 5;
        }

        if (blank[52] <= blank[42] && blank[42] <= blank[48]) {
            score = score + 10;
        }


        /**
         * 3.（9分）导热系数计算
         */
        if (blank[55] <= blank[56]) {
            score = score + 9;
        }
        return score;
    }
}
