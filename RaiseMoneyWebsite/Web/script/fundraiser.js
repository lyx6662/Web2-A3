document.addEventListener('DOMContentLoaded', function () {
    const organizer = localStorage.getItem('ORGANIZER');
    if (organizer) {
        const url = 'http://localhost:3060/api/raisemoney/' + organizer;
        fetch(url)
           .then(response => response.json())
           .then(data => {
                const dataDiv = document.getElementById('data');
                dataDiv.innerHTML = "";
                if (data.length > 0) {
                    data.forEach(fundraiser => {
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

                        // Display donation list for the fundraiser
                        if (fundraiser.donations && fundraiser.donations.length > 0) {
                            const donationList = document.createElement('ul');
                            fundraiser.donations.forEach(donation => {
                                const donationItem = document.createElement('li');
                                donationItem.textContent = `Donor: ${donation.donor_name}, Amount: ${donation.amount}$`;
                                donationList.appendChild(donationItem);
                            });
                            fundraiserCard.appendChild(donationList);
                        } else {
                            const noDonations = document.createElement('p');
                            noDonations.textContent = 'No donations yet.';
                            fundraiserCard.appendChild(noDonations);
                        }

                        dataDiv.appendChild(fundraiserCard);
                    });
                } else {
                    dataDiv.textContent = "No fundraiser";
                }
            });
    }
});

function toDonate() {
    window.location.href = '/donation';
}