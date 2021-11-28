const courses = [
    {
      section: 'COS310',
      title: 'Modern JavaScript',
      instructor: 'Mikov',
      department: 'COS',
      credits: 1,
    },
    {
      section: 'INF240',
      title: 'Website Development',
      instructor: 'Dimitrov',
      department: 'INF',
      credits: 3,
    },
    {
      section: 'INF280',
      title: 'Database Systems',
      instructor: 'Christozov',
      department: 'INF',
      credits: 3,
    },
    {
        section: 'MAT104',
        title: 'Calculus II',
        instructor: 'Dalakov',
        department: 'MAT',
        credits: 3,
    },
    {
      section: 'COS221',
      title: 'Fundamental Data Structures',
      instructor: 'Christozov',
      department: 'COS',
      credits: 3,
    },
    {
      section: 'BUS260',
      title: 'Marketing',
      instructor: 'Petkov',
      department: 'BUS',
      credits: 3,
    },
    {
      section: 'BUS300',
      title: 'Business Ethics',
      instructor: 'Schwartz',
      department: 'BUS',
      credits: 4,
    },
    {
      section: 'BUS220',
      title: 'Financial Accounting',
      instructor: 'Cleary',
      department: 'BUS',
      credits: 3,
    },
    {
      section: 'BUS448',
      title: 'Strategic Management',
      instructor: 'Pantelides',
      department: 'BUS',
      credits: 3,
    },
    {
      section: 'THR130',
      title: 'Beginning Acting',
      instructor: 'Delchev',
      department: 'FAR',
      credits: 3,
    },
    {
      section: 'ENG205',
      title: 'Creative Writing',
      instructor: 'Cohen',
      department: 'ENG',
      credits: 4,
    },
  ];
  
const students = [
    {
      name: 'Adam Banff',
      standing: 'Junior',
      courses: ['INF240', 'BUS220', 'ENG205']
    },
    {
      name: 'Betty Cahn',
      standing: 'Senior',
      courses: ['INF280', 'COS221', 'COS310']
    },
    {
      name: 'Chisto Dotev',
      standing: 'Senior',
      courses: ['BUS220', 'BUS448', 'THR130']
    },
    {
      name: 'Dani Emerson',
      standing: 'Sophomore',
      courses: ['ENG205', 'THR130', 'COS310']
    },
    {
      name: 'Emy Fang',
      standing: 'Senior',
      courses: ['BUS300', 'BUS260', 'BUS448']
    },
    {
      name: 'Filip Gomez',
      standing: 'Junior',
      courses: ['COS221', 'COS415', 'INF240']
    },
    {
      name: 'Gergana Harris',
      standing: 'Senior',
      courses: ['BUS448', 'ENG205', 'THR130']
    },
    {
      name: 'Harry Insman',
      standing: 'Senior',
      courses: ['COS310', 'ENG205', 'THR130']
    },
    {
      name: 'Iliana Johnes',
      standing: 'Sophomore',
      courses: ['BUS260', 'BUS300', 'ENG205']
    },
    {
      name: 'Jane Kelly',
      standing: 'Sophomore',
      courses: ['BUS220', 'BUS260', 'THR130']
    }
  ];

// How many students are there per standing (freshman, sophomore, etc)?
function students_Standing() {
    let fresh=0,sopho=0;junior=0;senior=0;
    const answer = [];
    for(let student of students)//loop through students
    {
        if(student.standing=='Freshman')//check if the student is freshman
        {
            freshmen++;
        }
        else if(student.standing=='Sophomore')//check if the student is sophomore
        {
            sopho++;
        }
        else if(student.standing=='Junior')//check if the student is junior
        {
            junior++;
        }
        else//other students are seniors
        {
            senior++;
        }
    }

    //Add values to an array
    answer.push("Freshmen: " + fresh);
    answer.push("Sophomores: " + sopho);
    answer.push("Juniors: " + junior);
    answer.push("Seniors: " + senior);

    return answer;
  }
  
//How many courses are there per department?
function courses_Department(){
    const courses_Department=[];
    for(let course of courses)//loop through courses
    {
        if(!courses_Department[course.department])
        {
          courses_Department[course.department]=0;//if the department of courses is not present in the result dictionary - initialize it to 0
        }
        courses_Department[course.department]+=1;//increment the number of courses per department
    }
    return courses_Department;
}

function countUnique(iterable) {//function to count unique values; it will be used on other functions
    return new Set(iterable).size;
}

//How many students are in each department?
function students_Department(){
    const studentsPerDepartment = [];
    const namesPerDepartment=[];//names of students for all departments
    const listOfStudents=[];//array that will be used to store splitted data
    for(let student of students)//loop through students
    {
        for(let dep of courses)//loop through courses
        {
            for(let course of student.courses)//loop through student.courses
            {
                if(!namesPerDepartment[dep.department])
                {
                    namesPerDepartment[dep.department] = "";//if the department is not present in the result dictionary - initialize it to ""
                }
                if(course == dep.section){//if course is equal with section at department
                    namesPerDepartment[dep.department] += student.name + ",";//add values to namesPerDepartment
                }
                listOfStudents[dep.department] = namesPerDepartment[dep.department].split(",");//split array
            }
            studentsPerDepartment[dep.department] = countUnique(listOfStudents[dep.department]) - 1;//count unique values, minus 1 because one extra value is added from "," split 
        }
    }
    return studentsPerDepartment;
}

//How many students does each professor teach to?
function numberOfStudents_Professors(){
    const numStudentsPerProfessor = [];
    const studentPerProfessor=[];
    const listOfProfessors = [];
    for(let student of students)//loop through students
    {
        for(let crs of courses)//loop through courses
        {
            for(let crs1 of student.courses)//loop through student courses array
            {
                if(!studentPerProfessor[crs.instructor])
                {
                    studentPerProfessor[crs.instructor] = "";//if the instructor is not present in the result dictionary - initialize it to ""
                }
                if(crs1 == crs.section)
                { 
                    studentPerProfessor[crs.instructor] += student.name+",";//add values to studentsPerProfessor
                }
                listOfProfessors[crs.instructor] = studentPerProfessor[crs.instructor].split(",");//split array
            }
            numStudentsPerProfessor[crs.instructor] = countUnique(listOfProfessors[crs.instructor]) - 1;//count unique values, minus 1 because one extra value is added from "," split 
        }
    }
    return numStudentsPerProfessor;
}

//Which course has the most students enrolled in it?
function maxNoStudents_Course(){
    const listOfCourses = [];
    const count = {};

    for(let student of students)
    {
        for(let crs of student.courses)
        {
            listOfCourses.push(crs);//add student courses in an array
        }

    }
    listOfCourses.forEach(function(i) { count[i] = (count[i]||0) + 1;});//count duplicates in the array

    const max = Math.max(... Object.values(count));//find max value 
    const MaxStudentsPerCourse = Object.entries(count).filter(([course, numbers]) => numbers == max);//if max value is equal with another value
    return MaxStudentsPerCourse;
}

//Which course has the fewest students enrolled in it?
function minNoStudents_Course(){
    const listOfCourses = [];
    const count = {};

    for(let student of students)
    {
        for(let crs of student.courses)
        {
            listOfCourses.push(crs);
        }

    }
    listOfCourses.forEach(function(i) { count[i] = (count[i]||0) + 1;});

    const coursesWithZeroStudents = [];
    for(crs of courses)//loop through courses
    {
        if(!listOfCourses.includes(crs.section))//if course is not part of listOfCourses
        {
            coursesWithZeroStudents.push(crs.section,0);//add courses with zero students enrolled in an array
        }
    }

    const min = Math.min(... Object.values(count));
    const MinStudentsPerCourse = Object.entries(count).filter(([course, numbers]) => numbers == min);
    if(coursesWithZeroStudents.length == 0)
    {
        return MinStudentsPerCourse;
    }
    else
    {
        return coursesWithZeroStudents;
    }
}

//Which student has the biggest sum of credits for their enrolled classes?
function biggestSumOfCredits(){
    let sum = 0;
    const creditsPerStudent=[];
    for(let student of students)//loop through students
    {
      for(let crs of courses)//loop through courses
      {
          for(let crs1 of student.courses)//loop through student courses
          {
            if(crs.section==crs1){
              sum+=crs.credits;//find sum of credits per each student
            }
          }
        }
        creditsPerStudent.push([student.name,sum]);//save those data in an array
        sum=0;//equal sum to zero because this variable will be used for other students
      }
    const count = Object.fromEntries(creditsPerStudent);
    const max = Math.max(... Object.values(count));//find max
    const studentWithMostCredits = Object.entries(count).filter(([name, cr]) => cr == max);//check if any other value is equal with max
    return studentWithMostCredits;
}

//What is the "major" of each student (the department they are taking most courses in)?
function majorOfEachStudent(){
    let coursesOfStudents=[];
    let counts = [];
    let studentsMajor = [];
    for(let student of students)//loop through students
    {
        for(let course of student.courses)//loop through student courses
        {
            for(let crs of courses)//loop through courses
            {
                if(!coursesOfStudents[student.name])//if this is not present in the result dictionary - initialize it to []
                { 
                    coursesOfStudents[student.name] = []; 
                }
                if(course == crs.section)
                { 
                    coursesOfStudents[student.name].push(course.substring(0,3));//if student course is equal with the section in courses, add first three letters(department) of a course in an array
                }
            }
        }
    }

    for(let i in coursesOfStudents)
    {
        counts = [];
        coursesOfStudents[i].forEach(function (i) { counts[i] = (counts[i] || 0) + 1; });//find duplicate classes of each students
       
        const max=Math.max(...Object.values(counts));//find max value, which represent the number of classes per department per each student 
        const numberOfSameDepartment = Object.fromEntries(Object.entries(counts).filter(([name, num]) => num == max));
        if(max==1)
        {
            studentsMajor.push(i, ["No major"]);
        }
        else
        {
            studentsMajor.push(i, Object.keys(numberOfSameDepartment))
        }
    }
    return studentsMajor;
}

//Which students are taking courses in the "ENG" department?
function engStudents(){
    const engStudents = [];
    for(let student of students)
    {
        for(let crs of courses)
        {
            for(let crs1 of student.courses)
            {
                if(crs1 == crs.section && crs.department == "ENG"){
                    engStudents.push(student.name);
                }
            }
        }
    }
    return engStudents;
}

console.log("How many students are there per standing (freshman, sophomore, etc)?");
console.log(students_Standing());
console.log();
console.log("How many courses are there per department?");
console.log(courses_Department());
console.log();
console.log("How many students are in each department?");
console.log(students_Department());
console.log();
console.log("How many students does each professor teach to?");
console.log(numberOfStudents_Professors());
console.log();
console.log("Which course has the most students enrolled in it?");
console.log(maxNoStudents_Course());
console.log();
console.log("Which course has the fewest students enrolled in it?");
console.log(minNoStudents_Course());
console.log();
console.log("Which student has the biggest sum of credits for their enrolled classes?");
console.log(biggestSumOfCredits());
console.log();
console.log("What is the major of each student (the department they are taking most courses in)?");
console.log(majorOfEachStudent());
console.log();
console.log("Which students are taking courses in the ENG department?");
console.log(engStudents());
console.log();