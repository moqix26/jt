document.addEventListener('DOMContentLoaded', function() {
    // 解析URL参数
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const data = {};
        for (let [key, value] of params.entries()) {
            data[key] = decodeURIComponent(value);
        }
        return data;
    }

    // 填充数据到页面
    function fillData(data) {
        // 基本信息
        const basicFields = ['department', 'grade', 'major', 'class', 'name', 'studentId', 'gender', 'ethnicity', 'phone'];
        basicFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        // 请假信息
        const leaveFields = ['leaveType', 'proxyLeave', 'leaveDays', 'parentKnow', 'parentName', 'parentPhone', 'destinationType', 'destination', 'reason'];
        leaveFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        // 日期字段 - 直接显示（date格式就是yyyy-mm-dd）
        const dateFields = ['applyDate', 'startDate', 'endDate'];
        dateFields.forEach(field => {
            const element = document.getElementById(field);
            if (element && data[field]) {
                element.textContent = data[field];
            }
        });

        // 审批信息
        if (data.department) {
            const counselorDepartment = document.getElementById('counselorDepartment');
            if (counselorDepartment) {
                counselorDepartment.textContent = data.department;
            }
        }
        if (data.counselorName) {
            const counselorNameDisplay = document.getElementById('counselorNameDisplay');
            if (counselorNameDisplay) {
                counselorNameDisplay.textContent = data.counselorName;
            }
        }
        if (data.applyDate) {
            const counselorDate = document.getElementById('counselorDate');
            if (counselorDate) {
                counselorDate.textContent = data.applyDate;
            }
        }
    }

    // 返回按钮点击事件
    const backBtn = document.querySelector('.back-icon');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.location.href = 'home.html';
        });
    }

    // 初始化
    const urlParams = getUrlParams();
    fillData(urlParams);
});
