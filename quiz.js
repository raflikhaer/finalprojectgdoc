// ══════════════════════════════════════════════
//  CODE QUIZ — quiz.js
//  Portofolio Rafli Khalifah Rahman
// ══════════════════════════════════════════════

(function () {

    // ── DATA SOAL ──────────────────────────────
    const QUESTIONS = {
        js: [
            {
                q: "Apa output dari kode berikut?",
                code: `let x = 1;\nconsole.log(x++ + ++x);`,
                opts: ["3", "4", "5", "NaN"],
                ans: 1,
                explain: "x++ mengambil nilai 1 lalu x menjadi 2. ++x pre-increment sehingga x menjadi 3. Maka 1 + 3 = 4."
            },
            {
                q: "Apa yang dicetak ke konsol?",
                code: `console.log(typeof null);`,
                opts: ["null", "undefined", "object", "string"],
                ans: 2,
                explain: "typeof null mengembalikan 'object' — ini adalah bug historis JavaScript yang tetap dipertahankan demi kompatibilitas."
            },
            {
                q: "Apa output dari kode ini?",
                code: `const arr = [1, 2, 3];\nconsole.log(arr.indexOf(4));`,
                opts: ["undefined", "null", "-1", "false"],
                ans: 2,
                explain: "indexOf() mengembalikan -1 jika elemen tidak ditemukan dalam array."
            },
            {
                q: "Apa hasil ekspresi berikut?",
                code: `console.log(0.1 + 0.2 === 0.3);`,
                opts: ["true", "false", "NaN", "Error"],
                ans: 1,
                explain: "Floating point tidak presisi: 0.1 + 0.2 menghasilkan 0.30000000000000004, bukan 0.3 persis."
            },
            {
                q: "Apa yang akan dicetak?",
                code: `let a = [1, 2, 3];\nlet b = a;\nb.push(4);\nconsole.log(a.length);`,
                opts: ["3", "4", "undefined", "Error"],
                ans: 1,
                explain: "Array adalah reference type. b = a tidak menyalin array — keduanya menunjuk ke objek yang sama di memori."
            },
            {
                q: "Apa output dari fungsi ini?",
                code: `function greet(name = 'World') {\n  return \`Hello, \${name}!\`;\n}\nconsole.log(greet());`,
                opts: ["Hello, !", "Hello, undefined!", "Hello, World!", "Error"],
                ans: 2,
                explain: "Default parameter 'World' digunakan ketika greet() dipanggil tanpa argumen."
            },
            {
                q: "Apa output kode berikut?",
                code: `console.log(!'');`,
                opts: ["false", "true", "''", "undefined"],
                ans: 1,
                explain: "String kosong '' adalah nilai falsy. Operator ! membaliknya menjadi true."
            },
            {
                q: "Apa hasil dari kode ini?",
                code: `const obj = { a: 1, b: 2 };\nconsole.log(Object.keys(obj).length);`,
                opts: ["1", "2", "3", "{a,b}"],
                ans: 1,
                explain: "Object.keys() mengembalikan array key: ['a','b']. Panjangnya adalah 2."
            }
        ],
        php: [
            {
                q: "Apa output dari kode PHP ini?",
                code: `<?php\n$a = 5;\n$b = '5';\nvar_dump($a == $b);`,
                opts: ["bool(false)", "bool(true)", "int(5)", "Error"],
                ans: 1,
                explain: "Operator == di PHP melakukan type coercion: '5' dikonversi ke int 5, sehingga 5 == 5 menghasilkan true."
            },
            {
                q: "Apa hasil dari ekspresi ini?",
                code: `<?php\necho strlen('Hello World');`,
                opts: ["10", "11", "5", "12"],
                ans: 1,
                explain: "strlen() menghitung semua karakter termasuk spasi: H-e-l-l-o-' '-W-o-r-l-d = 11 karakter."
            },
            {
                q: "Apa yang dicetak oleh kode ini?",
                code: `<?php\n$arr = [3, 1, 4, 1, 5];\nsort($arr);\necho $arr[0];`,
                opts: ["3", "1", "5", "4"],
                ans: 1,
                explain: "sort() mengurutkan array secara ascending. Elemen pertama setelah diurutkan adalah nilai terkecil: 1."
            },
            {
                q: "Apa output dari kode berikut?",
                code: `<?php\n$x = 10;\nfunction test() {\n  echo $x;\n}\ntest();`,
                opts: ["10", "null", "undefined", "Notice / kosong"],
                ans: 3,
                explain: "PHP tidak mengangkat variabel global ke dalam fungsi secara otomatis. Perlu menggunakan keyword 'global $x' di dalam fungsi."
            },
            {
                q: "Apa hasil dari operasi ini?",
                code: `<?php\necho intdiv(7, 2);`,
                opts: ["3.5", "4", "3", "Error"],
                ans: 2,
                explain: "intdiv() melakukan integer division (pembagian bulat). 7 dibagi 2 = 3 dengan sisa 1 yang diabaikan."
            },
            {
                q: "Apa yang dicetak?",
                code: `<?php\n$name = 'Rafli';\necho str_repeat($name[0], 3);`,
                opts: ["RRR", "aaa", "Raf", "Error"],
                ans: 0,
                explain: "$name[0] mengambil karakter pertama yaitu 'R'. str_repeat() mengulangnya 3 kali menjadi 'RRR'."
            },
            {
                q: "Apa output dari array_pop ini?",
                code: `<?php\n$fruits = ['apple', 'banana', 'cherry'];\n$last = array_pop($fruits);\necho count($fruits);`,
                opts: ["3", "2", "1", "cherry"],
                ans: 1,
                explain: "array_pop() menghapus dan mengembalikan elemen terakhir. Sisa array: ['apple','banana'], sehingga count = 2."
            },
            {
                q: "Apa hasil dari kode ini?",
                code: `<?php\n$a = true;\n$b = false;\nvar_dump($a && !$b);`,
                opts: ["bool(false)", "bool(true)", "int(1)", "NULL"],
                ans: 1,
                explain: "!$b = !false = true. Kemudian $a && true = true && true = true. var_dump menampilkan bool(true)."
            }
        ]
    };

    // ── STATE ──────────────────────────────────
    let lang        = 'js';
    let questions   = [];
    let idx         = 0;
    let score       = 0;
    let answered    = false;
    let timerInterval = null;
    let timeLeft    = 15;
    const TIMER_MAX = 15;
    let leaderboard = [];

    // ── UTIL ───────────────────────────────────
    function shuffle(arr) {
        return [...arr].sort(() => Math.random() - 0.5);
    }

    // ── MODAL ──────────────────────────────────
    const modal    = document.getElementById('quizModal');
    const btnOpen  = document.getElementById('openQuizBtn');
    const btnClose = document.getElementById('closeQuizModal');

    btnOpen.addEventListener('click', () => {
        modal.classList.remove('quiz-hidden');
        document.body.style.overflow = 'hidden';
        initQuiz();
    });

    btnClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.add('quiz-hidden');
        document.body.style.overflow = '';
        clearInterval(timerInterval);
    }

    // ── LEADERBOARD ────────────────────────────
    function renderLeaderboard() {
        const el = document.getElementById('quizLbList');
        if (leaderboard.length === 0) {
            el.innerHTML = '<p class="quiz-lb-empty">Belum ada sesi selesai.</p>';
            return;
        }
        const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 5);
        el.innerHTML = sorted.map((e, i) => `
            <div class="quiz-lb-row">
                <span class="quiz-lb-rank">${i + 1}</span>
                <span class="quiz-lb-name">${e.name}</span>
                <span class="quiz-lb-lang">${e.lang.toUpperCase()}</span>
                <span class="quiz-lb-pts">${e.score}<span class="quiz-lb-max">/${e.total * 20}</span></span>
            </div>
        `).join('');
    }

    // ── TIMER ──────────────────────────────────
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = TIMER_MAX;

        const bar     = document.getElementById('quizTimerBar');
        const counter = document.getElementById('quizTimerCount');
        bar.style.width = '100%';
        bar.classList.remove('warn');

        timerInterval = setInterval(() => {
            timeLeft--;
            bar.style.width = ((timeLeft / TIMER_MAX) * 100) + '%';
            counter.textContent = timeLeft;
            if (timeLeft <= 5) bar.classList.add('warn');
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                if (!answered) autoFail();
            }
        }, 1000);
    }

    function autoFail() {
        answered = true;
        document.querySelectorAll('.quiz-opt-btn').forEach((b, i) => {
            b.disabled = true;
            if (i === questions[idx].ans) b.classList.add('correct');
        });
        document.getElementById('quizExplain').classList.add('show');
        document.getElementById('quizNextBtn').style.display = 'inline-flex';
    }

    // ── RENDER SOAL ────────────────────────────
    function loadQuestion() {
        answered = false;
        const q = questions[idx];

        document.getElementById('quizQNum').textContent  = `Soal ${idx + 1} / ${questions.length}`;
        document.getElementById('quizQText').textContent = q.q;
        document.getElementById('quizQCode').textContent = q.code;
        document.getElementById('quizExplain').textContent = q.explain;
        document.getElementById('quizExplain').classList.remove('show');
        document.getElementById('quizNextBtn').style.display = 'none';
        document.getElementById('quizProgText').textContent  = `${idx + 1} dari ${questions.length} soal`;

        const optsEl = document.getElementById('quizOpts');
        optsEl.innerHTML = q.opts.map((o, i) => `
            <button class="quiz-opt-btn" data-i="${i}">${o}</button>
        `).join('');

        optsEl.querySelectorAll('.quiz-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.i)));
        });

        startTimer();
    }

    // ── JAWABAN ────────────────────────────────
    function handleAnswer(chosen) {
        if (answered) return;
        answered = true;
        clearInterval(timerInterval);

        const q         = questions[idx];
        const timeBonus = Math.max(0, Math.floor((timeLeft / TIMER_MAX) * 10));

        document.querySelectorAll('.quiz-opt-btn').forEach((b, i) => {
            b.disabled = true;
            if (i === q.ans) b.classList.add('correct');
            else if (i === chosen) b.classList.add('wrong');
        });

        if (chosen === q.ans) {
            score += 10 + timeBonus;
            document.getElementById('quizScoreBadge').innerHTML =
                'Skor: <strong>' + score + '</strong>';
        }

        document.getElementById('quizExplain').classList.add('show');
        document.getElementById('quizNextBtn').style.display = 'inline-flex';
    }

    // ── NEXT / HASIL ───────────────────────────
    function nextQuestion() {
        idx++;
        if (idx >= questions.length) {
            showResult();
        } else {
            loadQuestion();
        }
    }

    function showResult() {
        clearInterval(timerInterval);
        document.getElementById('quizTimerBar').style.width = '0%';

        const total    = questions.length;
        const maxScore = total * 20;
        const pct      = Math.round((score / maxScore) * 100);
        const emoji    = pct >= 80 ? '🏆' : pct >= 50 ? '💪' : '📚';
        const msg      = pct >= 80 ? 'Luar biasa!' : pct >= 50 ? 'Bagus, terus semangat!' : 'Jangan menyerah!';

        document.getElementById('quizBody').innerHTML = `
            <div class="quiz-result">
                <div class="quiz-result-emoji">${emoji}</div>
                <div class="quiz-result-score">${score}</div>
                <div class="quiz-result-msg">${msg} — ${pct}% dari skor maksimal (${maxScore})</div>
                <button class="quiz-retry-btn" id="quizRetryBtn">↺ &nbsp;Main lagi</button>
            </div>
        `;
        document.getElementById('quizNextBtn').style.display = 'none';
        document.getElementById('quizProgText').textContent  = '';

        leaderboard.push({
            name:  'Kamu (' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ')',
            score: score,
            total: total,
            lang:  lang
        });
        renderLeaderboard();

        document.getElementById('quizRetryBtn').addEventListener('click', initQuiz);
    }

    // ── INIT ───────────────────────────────────
    function initQuiz() {
        idx   = 0;
        score = 0;

        document.getElementById('quizScoreBadge').innerHTML = 'Skor: <strong>0</strong>';
        document.getElementById('quizBody').innerHTML = `
            <div class="quiz-qnum"  id="quizQNum"></div>
            <div class="quiz-qtext" id="quizQText"></div>
            <pre class="quiz-code"  id="quizQCode"></pre>
            <div class="quiz-opts"  id="quizOpts"></div>
            <div class="quiz-explain" id="quizExplain"></div>
        `;

        questions = shuffle(QUESTIONS[lang]);
        loadQuestion();
    }

    // ── PILIH BAHASA ───────────────────────────
    document.getElementById('quizBtnJS').addEventListener('click', () => {
        lang = 'js';
        document.getElementById('quizBtnJS').classList.add('active');
        document.getElementById('quizBtnPHP').classList.remove('active');
        initQuiz();
    });

    document.getElementById('quizBtnPHP').addEventListener('click', () => {
        lang = 'php';
        document.getElementById('quizBtnPHP').classList.add('active');
        document.getElementById('quizBtnJS').classList.remove('active');
        initQuiz();
    });

    // ── NEXT BTN ───────────────────────────────
    document.getElementById('quizNextBtn').addEventListener('click', nextQuestion);

    // ── RENDER LEADERBOARD AWAL ────────────────
    renderLeaderboard();

})();