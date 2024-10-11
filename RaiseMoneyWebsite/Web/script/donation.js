document.getElementById('donationForm').addEventListener('submit', function (e) {  
    e.preventDefault();  
  
    // 获取表单数据  
    const fundraiserId = document.getElementById('fundraiserId').value;  
    const donorName = document.getElementById('donorName').value;  
    const amount = parseFloat(document.getElementById('donationAmount').value);  
  
    // 检查捐款金额是否达到最低要求  
    if (isNaN(amount) || amount < 5) {  
        alert('请确保捐款金额至少为 5 AUD，并输入有效的数字。');  
        return;  
    }  
  
    // 检查并创建 fundraiserInfoDiv（如果尚未存在）  
    let fundraiserInfoDiv = document.getElementById('fundraiserInfo');  
    if (!fundraiserInfoDiv) {  
        fundraiserInfoDiv = document.createElement('div');  
        fundraiserInfoDiv.id = 'fundraiserInfo';  
        document.body.appendChild(fundraiserInfoDiv); // 注意：通常最好将新元素添加到特定的容器内，而不是直接添加到 body  
    }  
  
    // 清空之前的 fundraiser 信息（如果需要）  
    fundraiserInfoDiv.innerHTML = '';  
  
    // 获取选定筹款人的详细信息并展示  
    fetch(`http://localhost:3060/api/raisemoney/fundraiser/${fundraiserId}`) // 注意：通常 URL 前面需要加上 http:// 或 https://  
        .then(response => {  
            if (!response.ok) {  
                throw new Error(`HTTP error! status: ${response.status}`);  
            }  
            return response.json();  
        })  
        .then(data => {  
            fundraiserInfoDiv.innerHTML = `  
                <p>筹款人姓名: ${data.ORGANIZER}</p>  
                <p>筹款说明: ${data.CAPTION}</p>  
            `;  
  
            // 发起捐款请求  
            return fetch(`http://localhost:3060/api/raisemoney/donation`, { // 同样注意 URL 格式  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/json'  
                },  
                body: JSON.stringify({ fundraiserId, donorName, amount })  
            });  
        })  
        .then(response => {  
            if (!response.ok) {  
                throw new Error(`HTTP error! status: ${response.status}`);  
            }  
            return response.json();  
        })  
        .then(data => {  
            alert(`感谢您向 [${data.fundraiserName || '筹款人'}] 捐款！`); // 假设服务器返回了包含筹款人姓名的数据，否则使用占位符  
  
            // 重定向到筹款页面（这里假设有一个通用的筹款页面，实际可能需要根据筹款ID重定向到具体页面）  
            window.location.href = '/fundraiser'; // 或者根据数据动态生成 URL，如 `/fundraiser/${fundraiserId}`  
        })  
        .catch(error => {  
            console.error('Error:', error);  
            if (error instanceof SyntaxError) {  
                console.error('Invalid JSON response:', error.message);  
            }  
            alert('处理您的捐款时发生错误。');  
        });  
});