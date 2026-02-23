import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [profile, setProfile] = useState("");
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  console.log(experience);

  return (
    <div className="App">
      <div className="inputForm">
        <h3>Input Your Details</h3>
        <AddInput inputType="text" placeholder="John Doe" state={name} setState={setName} label="Name" />
        <AddInput inputType="email" placeholder="john.doe@example.com" state={mail} setState={setMail} label="Email" />
        <AddInput inputType="tel" placeholder="+1234567890" state={phone} setState={setPhone} label="Phone" />
        <AddTextArea sectionName="Personal Profile" state={profile} setState={setProfile} />
        <AddTextArea sectionName="Skills" state={skills} setState={setSkills} />

        <AddNewSection sectionName="Experience" state={experience} setState={setExperience} properties={["Company", "Role", "Duration"]} />
        <AddNewSection sectionName="Education" state={education} setState={setEducation} properties={["Institution", "Degree", "Years"]} />
      </div>

      
      <div className="cv-container">
        <h2>Curriculum Vitae</h2>

        <div className="personal-details">
          {name || mail || phone ? <h3>Personal Details</h3> : null}
          {name && <p>Name: {name}</p>}
          {mail && <p>Email: {mail}</p>}
          {phone && <p>Phone: {phone}</p>}
        </div>
        <TextareaToCV sectionName="Personal Profile" state={profile} className="profile-section" />
        <TextareaToCV sectionName="Skills" state={skills} className="skills-section" />
        <SectionToCV sectionName="Experience" state={experience} properties={["Company", "Role", "Duration"]} />
        <SectionToCV sectionName="Education" state={education} properties={["Institution", "Degree", "Years"]} />
      </div>
    </div>
  );
}

function AddTextArea({ sectionName, state, setState }) {
  return (
    <>
    <h3>{sectionName}</h3>
        <textarea
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={`Describe your ${sectionName.toLowerCase()} here...`}
          type="text"
        />
    </>
  );

}

function TextareaToCV({ sectionName, state , className}) {
  return (
    <div className={className}>
      {state && state.length > 0 && <h3>{sectionName}</h3>}
      {state && <p>{state}</p>}
    </div>
  );
} 

function AddInput({ inputType, placeholder, state, setState, label }) {
  return (
    <>
      <label htmlFor={label+"Input"}>{label}</label>
      <input
        type={inputType}
        placeholder={placeholder}
        id={label+"Input"}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </>
  );
}

function AddNewSection({ sectionName, state, setState, properties }) {
  // Logic to handle changing an input field
  const handleUpdate = (index, key, value) => {
    const updatedState = state.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item; // Keep others as they are
    });
    setState(updatedState);
    console.log(updatedState);
  };

  return (
    <>
      <h3>{sectionName}</h3>
      <button onClick={() => setState([...state, { [properties[0]]: "", [properties[1]]: "", [properties[2]]: "" }])}>
        Add {sectionName}
      </button>

      {state.map((exp, index) => (
        <div key={index} className="experience-entry">
          {/* Map through your properties to make the inputs dynamic too! */}
          {properties.map((propName) => (
            <AddInput
              inputType={"text"}
              placeholder={`Enter ${propName.toLowerCase()}...`}
              key={propName}
              label={propName}
              state={exp[propName]} // Access the property dynamically
              setState={(value) => handleUpdate(index, propName, value)}
            />
          ))}
          
          <button onClick={() => setState(state.filter((_, i) => i !== index))}>
            Remove
          </button>
        </div>
      ))}
    </>
  );
}

function SectionToCV({ sectionName, state, properties }) {
  if (!state) return null; // Don't render if state is empty  

  return (
    <div className={`${sectionName.toLowerCase()}-section`}>
      {state.length > 0 && <h3>{sectionName}</h3>}
      {state.map((item, index) => (
          <div key={index} className="item-entry">
            {properties.map(prop => item[prop] && <p>{prop}: {item[prop]}</p>)}
          </div>
        ))}  
    </div>
  );
}

export default App;
