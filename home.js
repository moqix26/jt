document.addEventListener('DOMContentLoaded', function() {
    // 标签切换功能
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有标签的active类
            tabs.forEach(t => t.classList.remove('active'));
            // 给当前点击的标签添加active类
            this.classList.add('active');
        });
    });

    // 请假天数计算功能
    const startTimeInput = document.getElementById('startDate');
    const endTimeInput = document.getElementById('endDate');
    const daysContent = document.getElementById('leaveDays');

    function validateAndCalculateDays() {
        if (startTimeInput && endTimeInput && daysContent) {
            if (startTimeInput.value && endTimeInput.value) {
                const start = new Date(startTimeInput.value);
                const end = new Date(endTimeInput.value);
                
                // 验证结束时间不能早于开始时间
                if (end < start) {
                    alert('"结束时间"不能小于"开始时间"！');
                    endTimeInput.value = startTimeInput.value;
                    daysContent.textContent = '1 天';
                    return;
                }
                
                const diffTime = end - start;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                daysContent.textContent = diffDays + " 天";
            } else {
                daysContent.textContent = '';
            }
        }
    }

    if (startTimeInput) {
        startTimeInput.addEventListener('change', validateAndCalculateDays);
    }
    if (endTimeInput) {
        endTimeInput.addEventListener('change', validateAndCalculateDays);
    }

    // 获取单选按钮值的函数
    function getRadioValue(name) {
        const radios = document.querySelectorAll('input[name="' + name + '"]');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
        return '';
    }

    // 设置单选按钮值的函数
    function setRadioValue(name, value) {
        const radios = document.querySelectorAll('input[name="' + name + '"]');
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].value === value) {
                radios[i].checked = true;
            }
        }
    }

    // 保存表单数据到localStorage
    function saveFormData() {
        const formData = {
            department: document.getElementById('department')?.value || '',
            grade: document.getElementById('grade')?.value || '',
            major: document.getElementById('major')?.value || '',
            class: document.getElementById('class')?.value || '',
            name: document.getElementById('name')?.value || '',
            studentId: document.getElementById('studentId')?.value || '',
            gender: getRadioValue('gender'),
            ethnicity: document.getElementById('ethnicity')?.value || '',
            applyDate: document.getElementById('applyDate')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            leaveType: getRadioValue('leaveType'),
            proxyLeave: getRadioValue('proxyLeave'),
            startDate: document.getElementById('startDate')?.value || '',
            endDate: document.getElementById('endDate')?.value || '',
            parentKnow: getRadioValue('parentKnow'),
            parentName: document.getElementById('parentName')?.value || '',
            parentPhone: document.getElementById('parentPhone')?.value || '',
            destinationType: document.getElementById('destinationType')?.value || '',
            destination: document.getElementById('destination')?.value || '',
            reason: document.getElementById('reason')?.value || '',
            counselorName: document.getElementById('counselorName')?.value || ''
        };
        localStorage.setItem('leaveFormData', JSON.stringify(formData));
    }

    // 从localStorage加载表单数据
    function loadFormData() {
        const savedData = localStorage.getItem('leaveFormData');
        if (!savedData) return;
        
        try {
            const formData = JSON.parse(savedData);
            
            // 填充文本输入框
            const textFields = ['department', 'grade', 'major', 'class', 'name', 'studentId', 'ethnicity', 'applyDate', 'phone', 'parentName', 'parentPhone', 'destination', 'reason', 'counselorName'];
            textFields.forEach(field => {
                const element = document.getElementById(field);
                if (element && formData[field]) {
                    element.value = formData[field];
                }
            });
            
            // 填充单选按钮
            const radioFields = ['gender', 'leaveType', 'proxyLeave', 'parentKnow'];
            radioFields.forEach(field => {
                if (formData[field]) {
                    setRadioValue(field, formData[field]);
                }
            });
            
            // 填充下拉框
            const destinationTypeEl = document.getElementById('destinationType');
            if (destinationTypeEl && formData.destinationType) {
                destinationTypeEl.value = formData.destinationType;
            }
            
            // 填充日期输入框
            const startDateEl = document.getElementById('startDate');
            const endDateEl = document.getElementById('endDate');
            if (startDateEl && formData.startDate) {
                startDateEl.value = formData.startDate;
            }
            if (endDateEl && formData.endDate) {
                endDateEl.value = formData.endDate;
            }
            
            // 如果有日期，计算请假天数
            if (formData.startDate && formData.endDate) {
                validateAndCalculateDays();
            }
        } catch (e) {
            console.error('加载表单数据失败', e);
        }
    }

    // 监听所有输入变化，自动保存
    const inputElements = document.querySelectorAll('input[type="text"], input[type="date"], select');
    inputElements.forEach(el => {
        if (el.type === 'date') {
            el.addEventListener('change', saveFormData);
        } else {
            el.addEventListener('input', saveFormData);
        }
    });
    
    const radioElements = document.querySelectorAll('input[type="radio"]');
    radioElements.forEach(el => {
        el.addEventListener('change', saveFormData);
    });

    // 下一处理按钮点击事件
    const nextBtn = document.querySelector('.btn-next');
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // 收集表单数据
            const formData = {
                department: document.getElementById('department')?.value || '',
                grade: document.getElementById('grade')?.value || '',
                major: document.getElementById('major')?.value || '',
                class: document.getElementById('class')?.value || '',
                name: document.getElementById('name')?.value || '',
                studentId: document.getElementById('studentId')?.value || '',
                gender: getRadioValue('gender'),
                ethnicity: document.getElementById('ethnicity')?.value || '',
                applyDate: document.getElementById('applyDate')?.value || '',
                phone: document.getElementById('phone')?.value || '',
                leaveType: getRadioValue('leaveType'),
                proxyLeave: getRadioValue('proxyLeave'),
                startDate: document.getElementById('startDate')?.value || '',
                endDate: document.getElementById('endDate')?.value || '',
                leaveDays: document.getElementById('leaveDays')?.textContent || '',
                parentKnow: getRadioValue('parentKnow'),
                parentName: document.getElementById('parentName')?.value || '',
                parentPhone: document.getElementById('parentPhone')?.value || '',
                destinationType: document.getElementById('destinationType')?.value || '',
                destination: document.getElementById('destination')?.value || '',
                reason: document.getElementById('reason')?.value || '',
                counselorName: document.getElementById('counselorName')?.value || '',
                counselorOpinion: document.getElementById('counselorOpinion')?.textContent || ''
            };

            // 验证必填字段
            const requiredFields = [
                { name: '院系', value: formData.department },
                { name: '年级', value: formData.grade },
                { name: '专业', value: formData.major },
                { name: '班级', value: formData.class },
                { name: '姓名', value: formData.name },
                { name: '学号', value: formData.studentId },
                { name: '性别', value: formData.gender },
                { name: '民族', value: formData.ethnicity },
                { name: '申请日期', value: formData.applyDate },
                { name: '联系方式', value: formData.phone },
                { name: '请假类型', value: formData.leaveType },
                { name: '是否代请假', value: formData.proxyLeave },
                { name: '请假开始时间', value: formData.startDate },
                { name: '请假结束时间', value: formData.endDate },
                { name: '家长是否知晓', value: formData.parentKnow },
                { name: '请假去向类型', value: formData.destinationType },
                { name: '请假去向（具体地点）', value: formData.destination },
                { name: '请假事由', value: formData.reason },
                { name: '辅导员姓名', value: formData.counselorName }
            ];

            let missingFields = [];
            for (let i = 0; i < requiredFields.length; i++) {
                if (!requiredFields[i].value) {
                    missingFields.push(requiredFields[i].name);
                }
            }

            if (missingFields.length > 0) {
                alert('请填写以下必填字段：' + missingFields.join('、'));
                return;
            }

            // 保存数据到localStorage
            saveFormData();

            // 构建URL参数
            const params = new URLSearchParams();
            for (let key in formData) {
                if (formData[key]) {
                    params.append(key, encodeURIComponent(formData[key]));
                }
            }

            // 跳转到next.html
            window.location.href = 'next.html?' + params.toString();
        });
    }

    // 返回按钮点击事件
    const backBtn = document.querySelector('.back-icon');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            window.history.back();
        });
    }

    // 页面加载时自动填充上次保存的数据
    loadFormData();
});
