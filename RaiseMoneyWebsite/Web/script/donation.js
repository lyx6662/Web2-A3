document.getElementById('donationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 获取传递过来的 fundraiserId（假设通过 URL 参数传递）
    const urlParams = new URLSearchParams(window.location.search);
    const fundraiserIdFromUrl = urlParams.get('fundraiserId');

    // 如果有从 URL 获取到的 fundraiserId，则使用它，否则使用表单中的值（如果表单中有默认值的话）
    const fundraiserId = fundraiserIdFromUrl;
    const donorName = document.getElementById('donorName').value;
    const amount = parseFloat(document.getElementById('donationAmount').value);

    // 检查捐款金额是否达到最低要求
    if (isNaN(amount) || amount < 5) {
        alert('请确保捐款金额至少为 5 AUD，并输入有效的数字。');
        return;
    }


    let fundraiserInfoDiv = document.getElementById('fundraiserInfo');
    // 清空之前的 fundraiser 信息（如果需要）
    fundraiserInfoDiv.innerHTML = '';
    console.log(fundraiserId);
    // 获取选定筹款人的详细信息并展示
    fetch(`http://localhost:3060/api/raisemoney/fundraiser/${fundraiserId}`)
    
    .then(response=>response.json()) 
   .then(data => {
    


        // 发起捐款请求
        return fetch(`http://localhost:3060/api/raisemoney/donation`, {
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
        return response.text();
    })
   .then(data => {
        if (data === "Donation inserted successfully") {
            // 如果服务器返回特定字符串，表示插入成功
            alert('捐款成功！');
        } else {
            try {
                const donationData = JSON.parse(data);
                alert(`感谢您向 [${donationData.fundraiserName || '筹款人'}] 捐款！`);
            } catch (error) {
                console.error('无法解析捐款响应为 JSON：', error);
                console.log('服务器返回的原始内容：', data);
                alert('处理您的捐款时发生错误。');
            }
        }

        // 重定向到筹款页面
        window.location.href = '/fundraiser';
    })
   .catch(error => {
        console.error('Error:', error);
        if (error instanceof SyntaxError) {
            console.error('Invalid JSON response:', error.message);
        }
        alert('处理您的捐款时发生错误。');
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const ID = localStorage.getItem('ID');
    if (ID) {
        const url = 'http://localhost:3060/api/raisemoney/' + ID;
        fetch(url)
           .then(response => response.json())
           .then(data => {
            
                const dataDiv = document.getElementById('data2');
                dataDiv.innerHTML = "";
                if (data.length > 0) {
                    data.forEach(fundraiser => {
                        console.log('完整的筹款人数据：', fundraiser);
                        const fundraiserCard = document.createElement('div');
                        fundraiserCard.classList.add('fundraiser_Card');

                        const cardTop = document.createElement('div');
                        cardTop.classList.add('card_Top');

                        const text1 = document.createElement('span');
                        text1.classList.add('text1');
                        text1.textContent = `ID:${fundraiser.FUNDRAISER_ID}`;

                        const text2 = document.createElement('span');
                        text2.classList.add('text2');
                        text2.textContent = `Category:${fundraiser.CATEGORY_NAME}`;

                        cardTop.appendChild(text1);
                        cardTop.appendChild(text2);
                        fundraiserCard.appendChild(cardTop);

                        const caption = document.createElement('h1');
                        caption.textContent = fundraiser.CAPTION;
                        fundraiserCard.appendChild(caption);

                        const oAndC = document.createElement('div');
                        oAndC.classList.add('organizer_City');

                        const text3 = document.createElement('span');
                        text3.classList.add('text3');
                        text3.textContent = `Organizer:${fundraiser.ORGANIZER}`;

                        const text4 = document.createElement('span');
                        text4.classList.add('text4');
                        text4.textContent = `City:${fundraiser.CITY}`;

                        oAndC.appendChild(text3);
                        oAndC.appendChild(text4);
                        fundraiserCard.appendChild(oAndC);

                        const tAndP = document.createElement('div');
                        tAndP.classList.add('tAndC_Pro');

                        const tAndC = document.createElement('div');
                        tAndC.classList.add('target_current');

                        const target = document.createElement('h3');
                        target.textContent = ` Target funding:${fundraiser.TARGET_FUNDING}$`;

                        const current = document.createElement('h3');
                        current.textContent = `Current funding:${fundraiser.CURRENT_FUNDING}$`;

                        const text5 = document.createElement('p');
                        text5.textContent = "Description: The fundraiser complies with the platform's fundraising regulations, if you want to donate to it, you can click the Donate button below. And thank you for your dedication to public welfare.";

                        tAndC.appendChild(target);
                        tAndC.appendChild(current);
                        tAndC.appendChild(text5);
                        tAndP.appendChild(tAndC);

                        const progressBarDiv = document.createElement('div');
                        progressBarDiv.classList.add('progressBar');

                        const roundness = document.createElement('div');
                        roundness.classList.add('roundness');

                        function updateCircularProgress() {
                            const percentage = fundraiser.CURRENT_FUNDING / fundraiser.TARGET_FUNDING;
                            const newGradient = `conic-gradient(#e1e43a 0, #e1e43a ${percentage * 100}%, #83b596 ${percentage * 100}%, #83b596)`;
                            roundness.style.background = newGradient;
                        }
                        updateCircularProgress();

                        progressBarDiv.appendChild(roundness);
                        tAndP.appendChild(progressBarDiv);
                        fundraiserCard.appendChild(tAndP);
                        dataDiv.appendChild(fundraiserCard);
                    });
                } else {
                    dataDiv.textContent = "No fundraiser";
                }
            });
    }
        });