// // data.js - Hàm tổng hợp nội dung ngân hàng câu hỏi
const createQs = (arr) => arr.map(item => ({
    q: item[0],
    options: [item[1], item[2], item[3], item[4]],
    correct: item[5],
    explanation: item[6]
}));

// const vdtData = {
//     domainCategories: [
//         {
//             id: 'web-sec',
//             title: '1. Web & Application Security',
//             icon: '🌐',
//             tags: ['OWASP Top 10', 'HTTP/Session/Cookie', 'SQLi', 'XSS', 'SSRF', 'Burp Suite'],
//             summary: `Mảng bảo mật web và ứng dụng cốt lõi nhất. Đòi hỏi bạn nắm vững luồng hoạt động của trình duyệt, các lỗ hổng theo OWASP Top 10 và khả năng đánh giá bằng Burp Suite.

//             **Kiến thức trọng tâm:**
//             *   OWASP Top 10: Nhận diện, khai thác và phòng chống (SQLi, XSS, SSRF, IDOR).
//             *   Giao thức Web: HTTP Methods, Headers, Cơ chế quản lý phiên (Session, Cookie, JWT).
//             *   Công cụ: Chặn bắt request bằng Burp Suite (Proxy, Repeater, Intruder).`,
//             quizzes: createQs(webSecQsRaw) // ~20 câu
//         },
//         {
//             id: 'rev-pwn',
//             title: '2. Reverse Engineering & Binary Exploit',
//             icon: '💣',
//             tags: ['Assembly x86/x64', 'Buffer/Heap overflow', 'ASLR', 'ROP', 'Ghidra', 'IDA'],
//             summary: `Dịch ngược (Reverse Engineering) và Khai thác lỗ hổng phần mềm (Pwnable/Binary Exploitation) yêu cầu kỹ năng cực mạnh về Assembly và cấu trúc bộ nhớ.

//             **Kiến thức trọng tâm:**
//             *   Ngôn ngữ cấp thấp: Đọc hiểu Assembly x86/x64, ngăn xếp bộ nhớ (Stack, Heap).
//             *   Khai thác: Buffer Overflow, Use-After-Free.
//             *   Vượt qua cơ chế bảo vệ: Trượt ROP (Return Oriented Programming) để lấy shell khi hệ thống bật ASLR, DEP/NX.
//             *   Công cụ dịch ngược: Trình Debug (gdb, x64dbg) và Trình phân tích tĩnh (Ghidra, IDA Pro).`,
//             quizzes: createQs(revPwnQsRaw) // ~18 câu
//         },
//         {
//             id: 'os-infra',
//             title: '3. Hệ điều hành & Hạ tầng',
//             icon: '🖥️',
//             tags: ['Windows Internals', 'Linux PAM', 'Active Directory', 'Privilege Escalation'],
//             summary: `Kiểm soát các thành phần sâu nhất của hệ điều hành Windows tới Linux và hệ thống mạng Domain doanh nghiệp (Active Directory).

//             **Kiến thức trọng tâm:**
//             *   Windows: Registry, UAC, SAM, LSASS, Dịch vụ nội bộ.
//             *   Linux: Quản lý quyền (chmod), SUDO, PAM, setuid/setgid.
//             *   Hạ tầng nội bộ: Kỹ thuật nhắm vào Active Directory (Kerberos, NTLM hash, Pass-the-Hash, Pass-the-Ticket).
//             *   Leo quyền (Privilege escalation) từ Local User lên SYSTEM/root.`,
//             quizzes: createQs(osInfraQsRaw) // ~18 câu
//         },
//         {
//             id: 'net-crypto',
//             title: '4. Network & Cryptography',
//             icon: '🌏',
//             tags: ['OSI/TCP-IP', 'DNS/SMB', 'Firewall/IPS', 'AES/RSA', 'TLS'],
//             summary: `Hiểu rõ mạng máy tính để phòng thủ hạ tầng LAN/WAN và ứng dụng Mật mã học (Cryptography) bảo vệ dữ liệu trên đường truyền.

//             **Kiến thức trọng tâm:**
//             *   Kiến trúc mạng: Mô hình OSI 7 lớp, giao thức TCP/UDP, ARP, DNS, SMB.
//             *   Thành phần an ninh: Cấu tạo Firewall có trạng thái (Stateful), IPS/IDS phân tích luồng.
//             *   Mật mã học cơ bản: Mã hóa đối xứng (AES), Bất đối xứng (RSA), Hàm băm (SHA), Thỏa thuận khóa (Diffie-Hellman), PKI, TLS.`,
//             quizzes: createQs(netCryptoQsRaw) // ~17 câu
//         },
//         {
//             id: 'soc-blue',
//             title: '5. SOC & Blue Team',
//             icon: '🛡️',
//             tags: ['Log analysis', 'SIEM', 'SOAR', 'Incident Response', 'MITRE ATT&CK'],
//             summary: `Điều hành phân tích và giám sát trung tâm An toàn thông tin (SOC) nhằm phát hiện sớm và xử lý sự cố.

//             **Kiến thức trọng tâm:**
//             *   Giám sát Hệ thống: Phân tích Log chuyên sâu (Windows Event, Sysmon, Firewall logs).
//             *   Công cụ: Vận hành SIEM liên kết sự kiện, chuẩn hóa qua SOAR tự động.
//             *   Chu trình xử lý sự cố (IR) và phân rã các kỹ thuật của Hacker qua bộ framework kinh điển MITRE ATT&CK.
//             *   Triage hành vi bất ngờ của mã độc, Threat Hunting (LotL).`,
//             quizzes: createQs(socBlueQsRaw) // ~13 câu
//         },
//         {
//             id: 'cloud-container',
//             title: '6. Cloud & Container Security',
//             icon: '☁️',
//             tags: ['Docker', 'Kubernetes', 'IAM', 'Misconfig', 'Secrets'],
//             summary: `Đón sóng công nghệ Ảo hóa và Đám mây. Bảo vệ môi trường Micro-services phức tạp.

//             **Kiến thức trọng tâm:**
//             *   Kiến trúc Cloud: AWS, cấu hình IAM Role, SSRF nhắm tới Metadata Cloud.
//             *   Bảo mật vùng chứa: Lỗi bảo mật Docker, leo quyền từ việc chạy Privileged Mode. Phân tích lỗ hổng trên file Dockerfile.
//             *   Điều phối cụm: Kubernetes (K8s) RBAC, Quản trị Secrets, Network Policies.`,
//             quizzes: createQs(cloudSecQsRaw) // ~12 câu
//         },
//         {
//             id: 'grc',
//             title: '7. GRC (Quản trị, Chính sách & Tuân thủ)',
//             icon: '📜',
//             tags: ['ISO 27001', 'Risk Management', 'CIA Triad', 'PDPA', 'Compliance'],
//             summary: `Quản lý rủi ro để đưa ra các quyết định bảo mật ở cấp độ quản trị. Hiểu tiêu chuẩn và luật lệ để tổ chức hoạt động hợp pháp.

//             **Kiến thức trọng tâm:**
//             *   Nền tảng: Mô hình CIA Triad. Tiêu chuẩn tổ chức ISO 27001, PCI-DSS.
//             *   Rủi ro: Ma trận rủi ro (Impact x Likelihood), BCP, DRP, Kế hoạch kinh doanh liên tục.
//             *   Quy định Pháp lý: NĐ 13/2023 Dữ liệu cá nhân (PDPA), GDPR của châu Âu. Phân loại tài sản thông tin.`,
//             quizzes: createQs(grcQsRaw) // ~12 câu
//         },
//         {
//             id: 'malware',
//             title: '8. Malware Analysis (Điểm cộng)',
//             icon: '🦠',
//             tags: ['PE/ELF', 'Static/Dynamic', 'Persistence', 'C2'],
//             summary: `Phân tích nâng cao cấu tạo các loại mã độc (Virus, Ransomware, Trojan, Rootkit) để tìm ra nguồn gốc thủ phạm.

//             **Kiến thức trọng tâm:**
//             *   Hiểu định dạng tệp thực thi (PE của Windows và ELF của Linux).
//             *   Reverse Engineering sơ bộ ở pha tĩnh (Static Analysis) kết hợp môi trường kiểm soát (Sandbox) ở pha động (Dynamic).
//             *   Đánh giá cách mã độc bền vững (Persistence) và kết nối tới C2 (Command & Control). 
//             *   Vượt qua Packers / Obfuscation (Entropy của file).`,
//             quizzes: createQs(malwareQsRaw) // ~9 câu
//         },
//         {
//             id: 'auto-tool',
//             title: '9. Automation & Tooling (Điểm cộng)',
//             icon: '🤖',
//             tags: ['Python Scriping', 'Tool Scan', 'Regex Parsing', 'AI/LLM'],
//             summary: `Phát triển công cụ tự động hóa tăng tốc quy trình Audit, Phân tích (Log) hoặc tích hợp DevSecOps.

//             **Kiến thức trọng tâm:**
//             *   Ngôn ngữ: Kỹ năng viết script Python thần tốc (Scapy, Requests), Bash shell.
//             *   Tự động hóa xử lý: Làm chủ Regex (Biểu thức chính quy) bóc tách logs, JSON Parsing cực mạnh.
//             *   Quét Web/App tự động bằng DAST, Selenium. Ứng dụng AI/Machine Learning trong việc phân tích cảnh báo.`,
//             quizzes: createQs(autoToolQsRaw) // ~9 câu
//         }
//     ]
// };

const vdtData = {
    domainCategories: [
        {
            id: 'web-sec',
            title: '1. Web & Application Security',
            icon: '🌐',
            tags: ['OWASP Top 10', 'HTTP/Session/Cookie', 'SQLi', 'XSS', 'SSRF', 'Burp Suite'],
            summary: `Mảng này tập trung vào cách ứng dụng web hoạt động (trình duyệt ↔ server ↔ cơ sở dữ liệu) và cách kẻ tấn công khai thác lỗi lập trình để truy cập trái phép dữ liệu hoặc hệ thống.

**Kiến thức trọng tâm:**
* Hiểu giao thức HTTP: Request/Response, Method (GET, POST), Header, Cookie, Session, JWT.
* Nắm vững OWASP Top 10: SQL Injection, XSS, SSRF, IDOR, File Upload, Command Injection, CSRF.
* Phân biệt lỗi logic (IDOR, auth bypass) và lỗi kỹ thuật (SQLi, RCE).
* Biết cách phòng chống: Prepared Statement, Input Validation, Output Encoding, Access Control.
* Sử dụng Burp Suite: Proxy (chặn request), Repeater (test thủ công), Intruder (fuzz/bruteforce).`,
            quizzes: createQs(webSecQsRaw)
        },

        {
            id: 'rev-pwn',
            title: '2. Reverse Engineering & Binary Exploit',
            icon: '💣',
            tags: ['Assembly x86/x64', 'Buffer/Heap overflow', 'ASLR', 'ROP', 'Ghidra', 'IDA'],
            summary: `Mảng này tập trung vào việc phân tích chương trình không có mã nguồn và khai thác lỗi quản lý bộ nhớ để thực thi mã độc.

**Kiến thức trọng tâm:**
* Hiểu Assembly x86/x64, calling convention, thanh ghi, stack frame.
* Cấu trúc bộ nhớ: Stack, Heap, Global, BSS.
* Các lỗi phổ biến: Buffer Overflow, Use-After-Free, Format String.
* Các cơ chế bảo vệ: ASLR, DEP/NX, Stack Canary, PIE.
* Kỹ thuật vượt bảo vệ: Return Oriented Programming (ROP).
* Công cụ: GDB, x64dbg (debug động), Ghidra, IDA Pro (phân tích tĩnh).`,
            quizzes: createQs(revPwnQsRaw)
        },

        {
            id: 'os-infra',
            title: '3. Hệ điều hành & Hạ tầng',
            icon: '🖥️',
            tags: ['Windows Internals', 'Linux PAM', 'Active Directory', 'Privilege Escalation'],
            summary: `Mảng này tập trung vào việc hiểu sâu hệ điều hành và môi trường doanh nghiệp để khai thác hoặc bảo vệ hệ thống.

**Kiến thức trọng tâm:**
* Windows: Registry, Service, Event Log, SAM, LSASS, Token, UAC.
* Linux: File permission (chmod/chown), SUID/SGID, PAM, cron, sudo.
* Active Directory: Kerberos, NTLM, Pass-the-Hash, Pass-the-Ticket, Kerberoasting.
* Kỹ thuật leo quyền (Privilege Escalation) trên Windows và Linux.
* Hiểu cách malware duy trì quyền truy cập (Persistence).`,
            quizzes: createQs(osInfraQsRaw)
        },

        {
            id: 'net-crypto',
            title: '4. Network & Cryptography',
            icon: '🌏',
            tags: ['OSI/TCP-IP', 'DNS/SMB', 'Firewall/IPS', 'AES/RSA', 'TLS'],
            summary: `Mảng này giúp hiểu cách dữ liệu di chuyển trong mạng và cách bảo vệ dữ liệu bằng mật mã học.

**Kiến thức trọng tâm:**
* Mô hình OSI 7 lớp, TCP/UDP, ARP, DNS, SMB, HTTP.
* Phân biệt Stateful và Stateless Firewall, IDS và IPS.
* Các kiểu tấn công mạng: MITM, DDoS, ARP Spoofing.
* Mã hóa đối xứng: AES. Mã hóa bất đối xứng: RSA, ECC.
* Hàm băm: SHA-256, MD5 (biết yếu điểm).
* TLS/SSL: bắt tay (handshake), chứng chỉ số, PKI, Diffie-Hellman.`,
            quizzes: createQs(netCryptoQsRaw)
        },

        {
            id: 'soc-blue',
            title: '5. SOC & Blue Team',
            icon: '🛡️',
            tags: ['Log analysis', 'SIEM', 'SOAR', 'Incident Response', 'MITRE ATT&CK'],
            summary: `Mảng này tập trung vào phát hiện sớm, phân tích và xử lý sự cố an toàn thông tin trong môi trường thực tế.

**Kiến thức trọng tâm:**
* Phân tích log: Windows Event Log, Sysmon, Firewall, Web Server Log.
* SIEM: thu thập, tương quan log, sinh cảnh báo.
* SOAR: tự động hóa xử lý sự cố.
* Quy trình Incident Response: Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned.
* MITRE ATT&CK: ánh xạ hành vi tấn công theo chiến thuật và kỹ thuật.
* Threat Hunting và phát hiện Living-off-the-Land.`,
            quizzes: createQs(socBlueQsRaw)
        },

        {
            id: 'cloud-container',
            title: '6. Cloud & Container Security',
            icon: '☁️',
            tags: ['Docker', 'Kubernetes', 'IAM', 'Misconfig', 'Secrets'],
            summary: `Mảng này tập trung vào bảo mật hệ thống chạy trên nền tảng đám mây và container.

**Kiến thức trọng tâm:**
* Cloud: IAM Role, Security Group, Metadata Service, nguy cơ SSRF.
* Docker: privileged mode, container escape, lỗ hổng Dockerfile.
* Kubernetes: RBAC, Service Account, Network Policy, Secrets.
* Các lỗi cấu hình phổ biến (misconfiguration) dẫn tới rò rỉ dữ liệu.
* Nguyên tắc least privilege trong môi trường cloud.`,
            quizzes: createQs(cloudSecQsRaw)
        },

        {
            id: 'grc',
            title: '7. GRC (Quản trị, Chính sách & Tuân thủ)',
            icon: '📜',
            tags: ['ISO 27001', 'Risk Management', 'CIA Triad', 'PDPA', 'Compliance'],
            summary: `Mảng này giúp đưa ra quyết định bảo mật ở cấp quản trị và đảm bảo tuân thủ pháp luật.

**Kiến thức trọng tâm:**
* CIA Triad: Confidentiality, Integrity, Availability.
* ISO 27001, PCI-DSS và các chuẩn quản lý ATTT.
* Đánh giá rủi ro: Risk = Impact × Likelihood.
* BCP, DRP (kế hoạch duy trì hoạt động và khôi phục thảm họa).
* Pháp lý: Luật ATTT, NĐ 13/2023 về dữ liệu cá nhân, GDPR.
* Phân loại và quản lý tài sản thông tin.`,
            quizzes: createQs(grcQsRaw)
        },

        {
            id: 'malware',
            title: '8. Malware Analysis (Điểm cộng)',
            icon: '🦠',
            tags: ['PE/ELF', 'Static/Dynamic', 'Persistence', 'C2'],
            summary: `Mảng này tập trung vào việc phân tích cấu trúc và hành vi của mã độc.

**Kiến thức trọng tâm:**
* Định dạng PE (Windows) và ELF (Linux).
* Static Analysis: strings, header, import table.
* Dynamic Analysis: chạy trong sandbox, theo dõi API, network.
* Kỹ thuật persistence: registry run key, service, scheduled task.
* Giao tiếp C2 (Command & Control).
* Packers, obfuscation và entropy file.`,
            quizzes: createQs(malwareQsRaw)
        },

        {
            id: 'auto-tool',
            title: '9. Automation & Tooling (Điểm cộng)',
            icon: '🤖',
            tags: ['Python Scripting', 'Tool Scan', 'Regex Parsing', 'AI/LLM'],
            summary: `Mảng này giúp tự động hóa các công việc kiểm thử, phân tích và giám sát an ninh.

**Kiến thức trọng tâm:**
* Python: requests, socket, scapy, subprocess.
* Regex để bóc tách log, parse JSON, CSV.
* Viết tool quét web/app tự động.
* Tích hợp script với SIEM hoặc pipeline CI/CD.
* Ứng dụng AI/ML cơ bản để phân loại cảnh báo.`,
            quizzes: createQs(autoToolQsRaw)
        }
    ]
};