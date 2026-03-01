/* Managing users and lawyers
Viewing system data */
/* ================= SAMPLE DATA ================= */
const citizens = [
    {name:"Ravi", email:"ravi@mail.com"},
    {name:"Anita", email:"anita@mail.com"}
];

const lawyers = [
    {name:"Adv. Kumar", status:"Pending"},
    {name:"Adv. Mehta", status:"Approved"}
];

const cases = [
{
    id:"C101",
    citizen:"Ravi",
    status:"Ongoing",
    timeline:[
        {step:"Case Registered", time:"2026-03-01"},
        {step:"Lawyer Assigned", time:"2026-03-05"},
        {step:"Hearing Scheduled", time:"2026-03-14"}
    ]
}
];

const appointments = ["Ravi with Adv. Kumar - 12 Mar"];
const logs = ["Sneha asked about FIR at 10:30 AM"];
const complaints = ["Lawyer not responding"];

/* SECTION SWITCH */
function showSection(id){
    document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* DASHBOARD */
function loadDashboard(){
    citizenCount.textContent = citizens.length;
    lawyerCount.textContent = lawyers.length;
    caseCount.textContent = cases.length;
    appointmentCount.textContent = appointments.length;
}

/* TABLES */
function loadTables(){
    citizenTable.innerHTML="<tr><th>Name</th><th>Email</th></tr>";
    citizens.forEach(c=>{
        citizenTable.innerHTML+=`<tr><td>${c.name}</td><td>${c.email}</td></tr>`;
    });

    lawyerTable.innerHTML="<tr><th>Name</th><th>Status</th></tr>";
    lawyers.forEach(l=>{
        lawyerTable.innerHTML+=`<tr><td>${l.name}</td><td>${l.status}</td></tr>`;
    });

    caseTable.innerHTML="<tr><th>ID</th><th>Status</th><th>Timeline</th></tr>";
    cases.forEach(c=>{
        caseTable.innerHTML+=`
        <tr>
            <td>${c.id}</td>
            <td>${c.status}</td>
            <td><button onclick="viewTimeline('${c.id}')">View</button></td>
        </tr>`;
    });

    appointmentList.innerHTML = appointments.map(a=>`<li>${a}</li>`).join("");
    logList.innerHTML = logs.map(l=>`<li>${l}</li>`).join("");
    complaintList.innerHTML = complaints.map(c=>`<li>${c}</li>`).join("");
}

/* TIMELINE */
function viewTimeline(id){
    const c = cases.find(x=>x.id===id);
    alert(c.timeline.map(t=>`${t.step} — ${t.time}`).join("\n"));
}

/* DATE & TIME */
function updateDateTime(){
    const now=new Date();
    datetime.textContent = now.toLocaleDateString()+" | "+now.toLocaleTimeString();
}
setInterval(updateDateTime,1000);

/* TOPBAR */
function toggleTheme(){
    document.body.classList.toggle("dark-mode");
}

function logout(){
    alert("Logged out successfully!");
}

function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle("hidden");
}

/* CALENDAR */
function openCalendar(){
    showSection("calendarSection");
    generateCalendar();
}

function loadMonthYear(){
    const m=document.getElementById("monthSelect");
    const y=document.getElementById("yearSelect");

    const months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    months.forEach((mo,i)=>m.innerHTML+=`<option value="${i}">${mo}</option>`);

    const currentYear=new Date().getFullYear();
    for(let i=currentYear-5;i<=currentYear+5;i++){
        y.innerHTML+=`<option value="${i}">${i}</option>`;
    }

    const today=new Date();
    m.value=today.getMonth();
    y.value=today.getFullYear();
}

function generateCalendar(){
    const grid=document.getElementById("calendarGrid");
    const month=+monthSelect.value;
    const year=+yearSelect.value;
    grid.innerHTML="";

    const firstDay=new Date(year,month,1).getDay();
    const totalDays=new Date(year,month+1,0).getDate();
    const today=new Date();

    for(let i=0;i<firstDay;i++) grid.appendChild(document.createElement("div"));

    const caseMap={};
    cases.forEach(c=>{
        c.timeline.forEach(t=>{
            const d=new Date(t.time);
            if(d.getMonth()===month && d.getFullYear()===year){
                const day=d.getDate();
                if(!caseMap[day]) caseMap[day]=[];
                caseMap[day].push(t.step);
            }
        });
    });

    for(let i=1;i<=totalDays;i++){
        const day=document.createElement("div");
        day.className="day";
        day.textContent=i;

        if(i===today.getDate() && month===today.getMonth() && year===today.getFullYear())
            day.classList.add("today");

        if(caseMap[i]){
            const count=caseMap[i].length;
            if(count<=2) day.classList.add("low");
            else if(count<=4) day.classList.add("medium");
            else day.classList.add("high");

            day.dataset.tooltip = count+" case(s)";
            day.onclick=()=>alert(caseMap[i].join("\n"));
        } else {
            day.dataset.tooltip="No cases";
        }

        grid.appendChild(day);
    }
}

/* LOAD */
window.onload=()=>{
    loadDashboard();
    loadTables();
    loadMonthYear();
    updateDateTime();
};