import React, { useEffect, useRef, useState } from 'react'
import Block from 'src/components/Block/Block'
import * as icons from 'react-icons/si';
import data from 'src/data.js'

import './Skills.css'
import Modal from 'src/components/Modal/Modal';


const skills = data.skills

export default function Skills() {
  const [isLargeDevice, setIsLargeDevice] = useState(!window.matchMedia("(min-width: 1024px)").matches);
  const [isOpen1, setIsOpen1] = useState(!isLargeDevice)
  const [isOpen2, setIsOpen2] = useState(!isLargeDevice)

  const [selectedSkill, setSelectedSkill] = useState(data.skills.programmingLanguage[0]);
  const [detailTrigger, setDetailTrigger] = useState();

  const handleSkillClick = (skill) => {
    setSelectedSkill(skill);
    setDetailTrigger(!detailTrigger);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeDevice(window.matchMedia("(min-width: 1024px)").matches);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  return (
    <section 
      className='section h-screen w-full 
      flex flex-col lg:flex-row justify-center 
      items-center gap-[1rem] lg:gap-[10vw]'>
      <Block 
        className='skills__block' 
        title="Programming Languages"
        open={isOpen1}
        onIsOpenChange={(o) => {
          if (isLargeDevice) return
          setIsOpen1(o)
          o && setIsOpen2(false)
        }}>
          {
            skills.programmingLanguage
              .map((item, index) => (
                  <SkillBar 
                    key={`SkillBar-${index}`} 
                    title={item.title} 
                    percent={item.percent}
                    onClick={() => handleSkillClick(item)} 
                  />
              ))
          }
      </Block>
      <Block 
        className='skills__block' 
        title="Technologies" 
        subtitle="Sorted by experience"
        open={isOpen2}
        onIsOpenChange={(o) => {
          if (isLargeDevice) return
          setIsOpen2(o)
          o && setIsOpen1(false)
        }}>
        <div className='skills__technologies'>
          {skills.technologies.map((item, index) => (
            <SkillBox
              key={`SkillBox-${index}`}
              title={item.title}
              icon={item.icon}
              onClick={() => handleSkillClick(item)}
            />
          ))}
        </div>
      </Block>
      {selectedSkill && (
        <Modal trigger={detailTrigger}>
          <div className='details flex flex-col gap-4 p-8'>
            <h2 className='text-white text-xl'>{selectedSkill.title}</h2>
            <ul className='bullet list-disc'>
              {selectedSkill.details.map((detail, index) => (
                <li key={`detail-${index}`}>{detail}</li>
              ))}
            </ul>
          </div>
        </Modal>
      )}
    </section>
  )
}


function SkillBar({title, percent, onClick}) {
  return (
    <div onClick={onClick} className='mt-6 w-full flex flex-col gap-4 cursor-pointer'>
      <h2 className='text-white text-xl'>{title}</h2>
      <div className='w-full bg-body-color-2 h-2'>
        <div className='h-full bg-primary-color' style={{width: `${percent}%`}} />
      </div>
    </div>
  )
}

function SkillBox({title, icon, onClick}) {
  const Icon = icon;
  const fontSize = title.length > 8 ? '1rem' : '1.2rem';
  return (
    <div 
      onClick={onClick}
      className='w-28 h-28 border-4 border-primary-color rounded-2xl 
      flex flex-col justify-evenly items-center cursor-pointer'>
      {/* {icon} */}
      <Icon className='text-5xl' />
      <h2 className='text-white text-xl' style={{fontSize}}>{title}</h2>
    </div>
  )
}