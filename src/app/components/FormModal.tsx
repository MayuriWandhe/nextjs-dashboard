// "use client";
// import { IoCreateOutline } from "react-icons/io5";
// import { IoMdAdd } from "react-icons/io";
// import { RiDeleteBin6Line } from "react-icons/ri";
// import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
// import { IoMdClose } from "react-icons/io";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { deleteClass, deleteSubject, deleteTeacher } from "../../lib/actions";
// import { error } from "console";
// import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
// import Link from 'next/link'
// import { FormContainerProps } from "./FormContainer";
// import { useFormState } from "react-dom";

// // import ClassForm from "./forms/ClassForm";
// // import SubjectForm from "./forms/SubjectForm";
// // import TeacherForm from "./forms/TeacherForm";
// // import StudentForm from "./forms/StudentForm";

// const deleteActionMap = {
//     subject : deleteSubject,
//     class : deleteClass,
//     teacher : deleteTeacher,
//     student : deleteSubject,
//     parent : deleteSubject,
//     lesson : deleteSubject,
//     exam : deleteSubject,
//     assignment : deleteSubject,
//     result : deleteSubject,
//     attendance : deleteSubject,
//     event : deleteSubject,
//     announcement : deleteSubject,
// }

// const TeacherForm = dynamic(()=> import("./forms/TeacherForm"),{
//     loading : () => <h1>Loading...</h1>
// })

// const StudentForm = dynamic(()=> import("./forms/StudentForm"),{
//     loading : () => <h1>Loading...</h1>
// })

// const SubjectForm = dynamic(()=> import("./forms/SubjectForm"),{
//     loading : () => <h1>Loading...</h1>
// })

// const ClassForm = dynamic(()=> import("./forms/ClassForm"),{
//     loading : () => <h1>Loading...</h1>
// })



// const forms : {
//     [key : string]: (
//         setOpen : Dispatch<SetStateAction<boolean>>, 
//         type : "create" | "update" , 
//         data ? :any , 
//         relatedData? : any
//     ) => JSX.Element;
    
// } = {
//     class : (setOpen, type, data, relatedData) => (<ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}  />),
//     subject : (setOpen, type, data, relatedData) => (<SubjectForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}  />),
//     teacher : (setOpen, type, data, relatedData) => (<TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />),
//     student : (setOpen, type, data, relatedData) => (<StudentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData} />)
// }


// const FormModal = ({
//     table, 
//     type, 
//     data, 
//     id, 
//     relatedData,
// } : FormContainerProps & { relatedData? : any }) => {
    
//     const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
//     const bgColor = type === "create" ? "bg-lamaYellow" : type === "update" ? "bg-lamaSky" :  type === "delete" ? "lamaPurpule" : 'red';

//     const [open, setOpen] = useState(false);

//     const Form = () =>{
//         const [state, formAction] = useFormState(deleteActionMap[table], { success : false, error : false });

//         const router = useRouter();

//         // useEffect(()=>{
//         //     if(state.success){
//         //         toast(`Subject has been ${type === 'create' ? 'created' : 'updated' }!`);
//         //         setOpen(false);
//         //         router.refresh();
//         //     }else{
//         //         toast('Something went wrong!')
//         //     }
//         //   })

//         useEffect(() => {
//             if (state.success) {
//               toast(`${table} has been deleted!`);
//               setOpen(false);
//               router.refresh();
//             }else if(state.error){
//                 toast('Something went wrong!')
//             }
//           }, [state, router]);
              
//           console.log('from form model : '  , table, 
//             type, 
//             data, 
//             id, 
//             relatedData)
          
//         return type == "delete" && id ? (
//             <form action={formAction} className="p-4 flex flex-col gap-4">
//                 <input type="text | number" name="id" value={id} hidden />
//                 <span className="text-center font-medium">All data will be lost. Are you sure you want to delete his {table}</span>
//                 <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">Delete</button>
//             </form>
//         ) : type === "create" || type === "update" ? (
//             // <StudentForm type="create"/>
//             forms[table](setOpen, type,data, relatedData)
//           ) : (
//             // console.log('from form model : '  , table, 
//             //     type, 
//             //     data, 
//             //     id, 
//             //     relatedData)
//             "Form not found!"
//           );
//     }
//     return (
//         <>
//             <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
//                 {type === 'create' && (
//                     <IoMdAdd />
//                 )}
//                 {type === 'update' && (
//                     <IoCreateOutline />
//                 )}
//                 {type === 'delete' && (
//                     <RiDeleteBin6Line />
//                 )}
//             </button>

//                 {/* <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
//                 </button>
//                 <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
//                 </button> */}
            
//             {open && <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
//                 <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]" >
//                     <Form />
//                     <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setOpen(false)}>
//                         <IoMdClose />
//                     </div>    
//                 </div>
//             </div>}
//         </>
//     )
// }

// export default FormModal;




"use client";

import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "../../lib/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";


const deleteActionMap = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
// TODO: OTHER DELETE ACTIONS
  parent: deleteSubject,
  lesson: deleteSubject,
  assignment: deleteSubject,
  result: deleteSubject,
  attendance: deleteSubject,
  event: deleteSubject,
  announcement: deleteSubject,
};

// USE LAZY LOADING

// import TeacherForm from "./forms/TeacherForm";
// import StudentForm from "./forms/StudentForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading...</h1>,
});
const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ExamForm = dynamic(() => import("./forms/ExamForm"), {
  loading: () => <h1>Loading...</h1>,
});
// TODO: OTHER FORMS

const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
    // TODO OTHER LIST ITEMS
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
      ? "bg-lamaSky"
      : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    
    console.log( ' : formAction : ' ,formAction, table, state , data)

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
      ) : type === "create" || type === "update" ? (
        forms[table](setOpen, type, data, relatedData)        
      ) : (
        "Form not found!"
      );
    };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
             <button className={`${size} flex items-center justify-center rounded-full ${bgColor}`}  onClick={() => setOpen(true)}>
                 {type === 'create' && (
                    <IoMdAdd />
               )}
              {type === 'update' && (
                  <IoCreateOutline />
              )}
              {type === 'delete' && (
                  <RiDeleteBin6Line />
              )}
          </button>
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
             <IoMdClose />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;