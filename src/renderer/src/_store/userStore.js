import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const createUserStore = (set)=>({
    isAuth : false,
    user : {},
    users : [],
    sections : [],
    designations : [],
    attendences : [],
    employees : [],

    addUser : (data)=>{
        set((state)=>({
            isAuth : true,
            user : data
        }))
    },
    removeUser : ()=>{
        set((state)=>({
            isAuth : false,
            user : {},
            users : [],
            sections : [],
            designations : [],
            attendences : [],
            employees : [],
        }))
    },
    addUsers : (users)=>{
        set((state)=>({
            users : users
        }))
    },
    addSections : (sections)=>{
        set((state)=>({
            sections : sections
        }))
    },
    addSection : (section)=>{
        set((state)=>({
            sections : [...state.sections, section]
        }))
    },
    addDesignations : (designations)=>{
        set((state)=>({
            designations : designations
        }))
    },
    addDesignation : (designation)=>{
        set((state)=>({
            designations : [...state.designations, designation]
        }))
    },
    addEmployees : (employees)=>{
        set((state)=>({
            employees : employees
        }))
    },
    addAttendences : (attendences)=>{
        set((state)=>({
            attendences : attendences
        }))
    },
    updateEntity : (path,data)=>{
        set((state)=>{
            if (path === 'designation'){
                return {designations : state.designations.map(designation=>designation._id === data._id ? data : designation)}
            }else if (path === 'section'){
                return {sections : state.sections.map(section=>section._id === data._id ? data : section)}
            }
        })
    },
    removeEntity : (path,id)=>{
        set((state)=>{
            if (path === 'attendence'){
                    return {attendences : state.attendences.filter(attendence=>attendence._id !== id)}
            }else if (path === 'employee'){
                return {employees : state.purchases.filter(purchase=>purchase._id !== id)}
            }else if (path === 'designation'){
                return {designations : state.designations.filter(designation=>designation._id !== id)}
            }else if (path === 'section'){
                return {sections : state.sections.filter(section=>section._id !== id)}
            }else if (path === 'auth'){
                return {users : state.users.filter(user=>user._id !== id)}
            }
        })
    }
})
const useStore =create(
    devtools(
        persist(createUserStore,{
            name : "user"
        })
    )
)
export default useStore;