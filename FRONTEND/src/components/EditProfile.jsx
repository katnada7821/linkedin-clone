import { useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { userDataContext } from "../assets/context/UserDataContext";
import dp from "../assets/dp.png"
import { MdAdd } from "react-icons/md";
import { FaCamera } from "react-icons/fa";
import { useState } from "react"
function EditProfile() {
    let { setEdit, userData } = useContext(userDataContext)
    let [firstName, setFirstName] = useState(userData.firstName || "")
    let [lastName, setLastName] = useState(userData.lastName || "")
    let [userName, setUserName] = useState(userData.userName || "")
    let [headline, setHeadline] = useState(userData.headline || "")
    let [location, setLocation] = useState(userData.location || "")
    let [gender, setGender] = useState(userData.gender || "")
    let [skills, setSkills] = useState(userData.skills || [])
    let [newSkills, setNewSkills] = useState([])
    let [education, setEducation] = useState(userData.education || [])
    let [newEducation, setNewEducation] = useState({
        college: "",
        degree: "",
        fieldofstudy: ""
    })
    let [experience, setExperience] = useState(userData.experience || [])
    let [newExperience, setNewExperience] = useState({
        title: "",
            company: "",
            description:""
    })


    function addSkill(e) {
        e.preventDefault()
        if (newSkills && !skills.includes(newSkills)) {
            setSkills([...skills, newSkills])

        }
        setNewSkills('')

    }

    function removeSkill(skill) {
        if (skills.includes(skill)) {
            setSkills(skills.filter((s) => s !== skill))
        }

    }

    function addEducation(e) {
        e.preventDefault()
        if (newEducation.college && newEducation.degree && newEducation.fieldofstudy) { setEducation([...education, newEducation]) }
        setNewEducation({
            college: "",
            degree: "",
            fieldofstudy: ""
        })
    }
    function removeEducation(edu) {
        if (education.includes(edu)) {
            setEducation(education.filter((e) => e !== edu))
        }

    }
    function addExperience(e) {
        e.preventDefault()
        if (newExperience.title && newExperience.company && newExperience.description) { setExperience([...experience, newExperience]) }
        setNewExperience({
           title: "",
            company: "",
            description:""
        })
    }
    function removeExperience(exp) {
        if (experience.includes(exp)) {
            setExperience(experience.filter((e) => e !== exp))
        }

    }


    return (
        <div className="w-full h-[100vh] fixed top-0 z-[100] flex justify-center items-center">
            <div className="w-full h-full bg-black opacity-[0.5] absolute"></div>
            <div className="w-[90%] max-w-[500px] h-[600px] bg-white  overflow-auto relative z-[200] shadow-lg rounded-lg p-[10px]">
                <div className="absolute top-[10px] right-[10px] cursor-pointer" onClick={() => setEdit(false)}><RxCross2 className=" w-[25px] h-[25px] text-gray-700 font-semibold cursor-pointer" /></div>

                <div className="w-full h-[150px] bg-gray-500 rounded-lg mt-[40px] overflow-hidden">
                    <img src="" alt="" className="w-full" />
                    <FaCamera className="absolute right-[27px] top-[60px] w-[25px] h-[25px] text-gray-800 cursor-pointer" />
                </div>

                <div className="w-[80px] h-[80px] rounded-full overflow-hidden absolute top-[147px] ml-[10px] ">
                    <img src={dp} alt="" className="w-full h-full" />
                </div>
                <div className="w-[18px] h-[18px] bg-[#0A66C2] absolute top-[206px] left-[83px] rounded-full flex justify-center items-center cursor pointer">
                    <MdAdd className="text-white" />
                </div>

                <div className="w-full flex flex-col items-center justify-center gap-[10px] mt-[50px]" >


                    <input type="text" placeholder='firstName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={firstName} onChange={(e) => setFirstName(e.target.vakue)}
                    />
                    <input type="text" placeholder='lirstName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={lastName} onChange={(e) => setLastName(e.target.vakue)}
                    />
                    <input type="text" placeholder='userName' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={userName} onChange={(e) => setUserName(e.target.vakue)}
                    />

                    <input type="text" placeholder='headline' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={headline} onChange={(e) => setHeadline(e.target.vakue)}
                    />
                    <input type="text" placeholder='location' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={location} onChange={(e) => setLocation(e.target.vakue)}
                    />
                    <input type="text" placeholder='gender(male/female/other)' className="w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[18px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" value={gender} onChange={(e) => setGender(e.target.vakue)}
                    />

                    <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg focus:outline-[#0A66C2]">
                        <h1 className="text-[19px] font-semibold">Skills</h1>
                        {skills && <div className=" flex flex-col gap-[10px]">
                            {skills.map((skill, index) => (
                                <div key={index} className="w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 p-[8px] rounded-lg flex justify-between items-center" ><span>{skill}</span> <RxCross2 className=" w-[20px] h-[20px] text-gray-700 font-semibold cursor-pointer" onClick={() => removeSkill(skill)} /> </div>
                            ))}
                        </div>
                        }
                        <div action="" className="flex flex-col gap-[10px] items-start">
                            <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="add a new skill" value={newSkills} onChange={(e) => setNewSkills(e.target.value)} />
                            <button className="w-[100%] h-[40px] rounded-full border-2 bg-[#0A66C2] text-white" onClick={addSkill}>Add</button>
                        </div>

                    </div>

                    <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg focus:outline-[#0A66C2]">
                        <h1 className="text-[19px] font-semibold">Education</h1>
                        {education && <div className=" flex flex-col gap-[10px]">
                            {education.map((edu, index) => (
                                <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 p-[8px] rounded-lg flex justify-between items-center" >
                                    <div className="">
                                        <div className=""> College:{edu.college}</div>
                                        <div className=""> Degree:{edu.degree}</div>
                                        <div className=""> Field of Study:{edu.fieldofstudy}</div>



                                    </div>


                                    <RxCross2 className=" w-[20px] h-[20px] text-gray-700 font-semibold cursor-pointer" onClick={() => removeEducation(edu)} /> </div>
                            ))}
                        </div>
                        }
                        <div action="" className="flex flex-col gap-[10px] items-start">

                            <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="College" value={newEducation.college} onChange={(e) => setNewEducation({ ...newEducation, college: e.target.value })} />
                            <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="Degree" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} />
                            <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="Field of Study" value={newEducation.fieldofstudy} onChange={(e) => setNewEducation({ ...newEducation, fieldofstudy: e.target.value })} />
                            <button className="w-[100%] h-[40px] rounded-full border-2 bg-[#0A66C2] text-white" onClick={addEducation}>Add</button>

                        </div>

                    </div>

                     <div className="w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg focus:outline-[#0A66C2]">
                        <h1 className="text-[19px] font-semibold">Experience</h1>
                        {experience && <div className=" flex flex-col gap-[10px]">
                            {experience.map((exp, index) => (
                                <div key={index} className="w-full border-[1px] border-gray-600 bg-gray-200 p-[8px] rounded-lg flex justify-between items-center" >
                                    <div className="">
                                        <div className=""> Title:{exp.title}</div>
                                        <div className=""> Company:{exp.company}</div>
                                        <div className=""> Description:{exp.description}</div>



                                    </div>


                                    <RxCross2 className=" w-[20px] h-[20px] text-gray-700 font-semibold cursor-pointer" onClick={() => removeExperience (exp)} /> </div>
                            ))}
                        </div>
                        }
                        <div action="" className="flex flex-col gap-[10px] items-start">

                            <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="Title" value={newExperience .title} onChange={(e) => setNewExperience ({ ...newExperience , title: e.target.value })} />
                             <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="Compnay" value={newExperience .company} onChange={(e) => setNewExperience ({ ...newExperience , company: e.target.value })} />
                              <input type="text" className=" w-[100%] h-[50px] border-2 border-gray-600 text-gray-800 text-[16px] px-[10px] py-[5px] rounded-md focus:outline-[#0A66C2]" placeholder="Description" value={newExperience .description} onChange={(e) => setNewExperience ({ ...newExperience , description: e.target.value })} />
                            
                            <button className="w-[100%] h-[40px] rounded-full border-2 bg-[#0A66C2] text-white" onClick={addExperience}>Add</button>

                        </div>

                    </div>

                    <button className="w-[100%] h-[50px] mt-[40px] rounded-full border-2 border-[#0A66C2] text-[#0A66C2]" > Save Profile</button>



                </div>


            </div>
        </div>
    )
}

export default EditProfile
