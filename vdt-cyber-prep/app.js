document.addEventListener('DOMContentLoaded', () => {
    // Navigation handling
    const navItems = document.querySelectorAll('.nav-item');
    const contentArea = document.getElementById('content-area');

    // State
    let currentDomainIndex = 0;
    let currentQuizIndex = 0;
    let quizScore = 0;

    // Render Functions
    const renderDashboard = () => {
        const totalQuizzes = vdtData.domainCategories.reduce((acc, cat) => acc + cat.quizzes.length, 0);

        contentArea.innerHTML = `
            <h1 class="page-title">Viettel Digital Talent 2026 - Cybersecurity Prep</h1>
            <div class="summary-cards">
                <div class="summary-card">
                    <h3>Tổng số phần kiến thức</h3>
                    <div class="value">${vdtData.domainCategories.length}</div>
                </div>
                <div class="summary-card">
                    <h3>Tổng số câu hỏi Quiz</h3>
                    <div class="value">${totalQuizzes}</div>
                </div>
                <div class="summary-card">
                    <h3>Vị trí tuyển dụng</h3>
                    <div class="value">4 Mảng chính</div>
                </div>
            </div>
            
            <div class="card" style="margin-top: 24px;">
                <h2 style="color: var(--accent-cyan); margin-bottom: 16px;">🔥 Về chương trình VDT</h2>
                <p style="color: var(--text-secondary); margin-bottom: 16px;">
                    Chương trình VDT kéo dài 06 tháng (04/2026 – 10/2026). Gồm 2 giai đoạn: Đào tạo chuyên sâu và Thực tập toàn thời gian.
                    Sinh viên cần nắm vững nền tảng Mạng, Hệ điều hành, Lập trình (C/C++), Dịch ngược, Web Security và có kiến thức về SOC, Pentest, GRC.
                </p>
                <button class="btn btn-primary" onclick="setPage('knowledge')">Bắt đầu ôn tập kiến thức</button>
            </div>
        `;
    };

    const renderKnowledge = () => {
        let html = `<h1 class="page-title">Kiến thức ôn tập trọng tâm</h1>`;

        vdtData.domainCategories.forEach((cat, index) => {
            let tagsHtml = cat.tags.map(t => `<span class="tag">${t}</span>`).join('');

            // Format markdown-like summary (basic replacing)
            let formattedSummary = cat.summary
                .replace(/\* \*\*(.*?)\*\*/g, '<h4>$1</h4>')
                .replace(/\n\n/g, '<br>')
                .replace(/\n/g, '<br>');

            html += `
                <div class="knowledge-section">
                    <div class="knowledge-header" onclick="toggleKnowledge(${index})" id="k-header-${index}">
                        <h3>${cat.icon} ${cat.title}</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron" id="k-icon-${index}"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                    <div class="knowledge-content" id="k-content-${index}">
                        <div style="margin-bottom: 16px;">${tagsHtml}</div>
                        <div class="summary-text">${formattedSummary}</div>
                        <div style="margin-top: 24px; text-align: right;">
                            <button class="btn btn-secondary" onclick="startDomainQuiz(${index})">Thi thử mảng này &rarr;</button>
                        </div>
                    </div>
                </div>
            `;
        });

        contentArea.innerHTML = html;
        window.toggleKnowledge = (index) => {
            const content = document.getElementById(`k-content-${index}`);
            const icon = document.getElementById(`k-icon-${index}`);
            if (content.classList.contains('open')) {
                content.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
                document.getElementById(`k-header-${index}`).style.borderColor = 'var(--border-color)';
            } else {
                content.classList.add('open');
                icon.style.transform = 'rotate(180deg)';
                document.getElementById(`k-header-${index}`).style.borderColor = 'var(--accent-purple)';
            }
        };
    };

    const renderQuizSelection = () => {
        let html = `
            <h1 class="page-title">Trắc nghiệm kiến thức</h1>
            <p style="color: var(--text-secondary); margin-bottom: 32px;">Chọn một mảng kiến thức để bắt đầu làm bài trắc nghiệm.</p>
            <div class="grid-2">
        `;

        vdtData.domainCategories.forEach((cat, index) => {
            html += `
                <div class="card quiz-domain">
                    <h3>${cat.icon} ${cat.title}</h3>
                    <p>${cat.quizzes.length} câu hỏi về ${cat.tags.slice(0, 3).join(', ')}...</p>
                    <button class="btn btn-primary" onclick="startDomainQuiz(${index})">Bắt đầu <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align: middle; margin-left: 4px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></button>
                </div>
            `;
        });
        html += `</div>`;
        contentArea.innerHTML = html;
    };

    window.startDomainQuiz = (domainIndex) => {
        currentDomainIndex = domainIndex;
        currentQuizIndex = 0;
        quizScore = 0;
        setPage('active-quiz');
        renderActiveQuiz();
    };

    const renderActiveQuiz = () => {
        const domain = vdtData.domainCategories[currentDomainIndex];
        const question = domain.quizzes[currentQuizIndex];

        let progress = ((currentQuizIndex) / domain.quizzes.length) * 100;

        let html = `
            <div class="quiz-container">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;">
                    <h2 style="color: var(--accent-cyan); font-size: 1.5rem;">${domain.title}</h2>
                    <span style="font-family: var(--font-mono); color: var(--text-secondary); cursor: pointer;" onclick="setPage('quiz')">✕ Bỏ thi</span>
                </div>
                
                <div class="quiz-progress">
                    <span>Câu hỏi ${currentQuizIndex + 1} / ${domain.quizzes.length}</span>
                    <span>Hoàn thành: ${Math.round(progress)}%</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar-fill" style="width: ${progress}%"></div>
                </div>

                <div class="question-card">
                    <div class="question-text">${question.q}</div>
                    <div class="options-grid" id="options-container">
                        ${question.options.map((opt, i) => `
                            <button class="option-btn" onclick="selectAnswer(${i})">${opt}</button>
                        `).join('')}
                    </div>
                    
                    <div id="feedback-area" class="feedback-area">
                        <h4 id="feedback-title" style="margin-bottom: 8px;"></h4>
                        <p id="feedback-desc"></p>
                    </div>

                    <div class="quiz-nav">
                        <div id="result-status" style="font-family: var(--font-mono); font-weight: bold;"></div>
                        <button id="next-btn" class="btn btn-primary" style="display: none;" onclick="nextQuestion()">Tiếp theo &rarr;</button>
                    </div>
                </div>
            </div>
        `;
        contentArea.innerHTML = html;

        // Ensure DOM is updated before animating progress bar to next
        setTimeout(() => {
            const bar = document.querySelector('.progress-bar-fill');
            if (bar) bar.style.width = `${((currentQuizIndex + 1) / domain.quizzes.length) * 100}%`;
        }, 50);
    };

    window.selectAnswer = (selectedIndex) => {
        const domain = vdtData.domainCategories[currentDomainIndex];
        const question = domain.quizzes[currentQuizIndex];
        const optionsContainer = document.getElementById('options-container');
        const btns = optionsContainer.querySelectorAll('.option-btn');

        // Disable all buttons
        btns.forEach(b => b.disabled = true);

        const isCorrect = selectedIndex === question.correct;

        // Highlight logic
        btns[selectedIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
            btns[question.correct].classList.add('correct'); // Show correct one
        } else {
            quizScore += 10;
            document.getElementById('total-score').innerText = parseInt(document.getElementById('total-score').innerText) + 10;
        }

        // Show feedback
        const feedback = document.getElementById('feedback-area');
        const feedbackTitle = document.getElementById('feedback-title');
        const feedbackDesc = document.getElementById('feedback-desc');

        feedback.classList.remove('correct', 'incorrect');
        if (isCorrect) {
            feedback.classList.add('correct', 'show');
            feedbackTitle.innerText = "Chính xác! 🎉";
            feedbackTitle.style.color = "var(--accent-green)";
        } else {
            feedback.classList.add('incorrect', 'show');
            feedbackTitle.innerText = "Chưa đúng! ❌";
            feedbackTitle.style.color = "var(--accent-pink)";
        }

        feedbackDesc.innerText = question.explanation;

        document.getElementById('next-btn').style.display = 'block';
    };

    window.nextQuestion = () => {
        const domain = vdtData.domainCategories[currentDomainIndex];
        if (currentQuizIndex < domain.quizzes.length - 1) {
            currentQuizIndex++;
            renderActiveQuiz();
        } else {
            // End of Quiz
            showModal();
        }
    };

    const showModal = () => {
        const modal = document.getElementById('result-modal');
        const modalBody = document.getElementById('modal-body');
        const domain = vdtData.domainCategories[currentDomainIndex];

        const possibleScore = domain.quizzes.length * 10;
        const passed = quizScore >= possibleScore / 2;

        modalBody.innerHTML = `
            <div>
                <p>Mảng: ${domain.title}</p>
                <div class="score-display">${quizScore} <span style="font-size: 1.5rem; color: var(--text-secondary)">/ ${possibleScore}</span></div>
                <p>${passed ? 'Tuyệt vời! Bạn có nền tảng tốt cho mảng này.' : 'Cần ôn lại thêm kiến thức chuyên môn bạn nhé!'}</p>
            </div>
        `;

        modal.classList.remove('hidden');
    };

    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('result-modal').classList.add('hidden');
        setPage('knowledge');
    });

    // Routing
    window.setPage = (target) => {
        // Update nav UI
        navItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.dataset.target === target || (target === 'active-quiz' && nav.dataset.target === 'quiz')) {
                nav.classList.add('active');
            }
        });

        // Add nice fade transition
        contentArea.style.opacity = '0';

        setTimeout(() => {
            if (target === 'dashboard') renderDashboard();
            else if (target === 'knowledge') renderKnowledge();
            else if (target === 'quiz') renderQuizSelection();

            contentArea.style.opacity = '1';
            contentArea.style.transition = 'opacity 0.3s ease';
        }, 150);
    };

    // Attach click events to nav
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            setPage(item.dataset.target);
        });
    });

    // Init
    renderDashboard();
});
