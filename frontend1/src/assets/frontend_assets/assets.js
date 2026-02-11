import doc1 from "./doc1.png"
import doc2 from "./doc2.png"
import doc3 from "./doc3.png"
import doc4 from "./doc4.png"
import doc5 from "./doc5.png"
import doc6 from "./doc6.png"
import doc7 from "./doc7.png"
import doc8 from "./doc8.png"
import doc9 from "./doc9.png"
import doc10 from "./doc10.png"
import doc11 from "./doc11.png"
import doc12 from "./doc12.png"
import doc13 from "./doc13.png"
import doc14 from "./doc14.png"
import doc15 from "./doc15.png"

import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.png'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'

import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]


export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General_physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James is committed to comprehensive care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Laura Bennett',
        image: doc2,
        speciality: 'Dermatologist',
        degree: 'MD',
        experience: '6 Years',
        about: 'Dr. Bennett specializes in treating skin disorders with an emphasis on patient education and long-term skin health.',
        fees: 70,
        address: {
            line1: '22 Baker Street',
            line2: 'London'
        }
    },
    {
        _id: 'doc3',
        name: ' Dr. Michael Carter',
        image: doc3,
        speciality: 'Gynecologist',
        degree: 'MD',
        experience: '8 Years',
        about: 'Dr. Carter is dedicated to women’s health, offering compassionate care and guidance for reproductive and general wellness.',
        fees: 80,
        address: {
            line1: '45 Elm Road',
            line2: 'Cambridge'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Samuel Thompson',
        image: doc4,
        speciality: 'Gastroenterologist',
        degree: 'MD',
        experience: '10 Years',
        about: 'Dr. Thompson focuses on digestive health, offering advanced diagnostic and treatment options for gastrointestinal disorders.',
        fees: 90,
        address: {
            line1: '11 Oak Street',
            line2: 'Manchester'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Emily White',
        image: doc5,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. White provides child-focused healthcare, ensuring early intervention and preventive care for infants and children.',
        fees: 60,
        address: {
            line1: '78 Maple Avenue',
            line2: 'Bristol'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Daniel Evans',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MD',
        experience: '7 Years',
        about: 'Dr. Evans specializes in diagnosing and treating neurological disorders with a patient-centered approach.',
        fees: 100,
        address: {
            line1: '5 Pine Crescent',
            line2: 'Leeds'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Sophia Lewis',
        image: doc7,
        speciality: 'Dermatologist',
        degree: 'MD',
        experience: '6 Years',
        about: 'Dr. Lewis treats a wide range of skin conditions, emphasizing modern techniques and personalized care plans.',
        fees: 75,
        address: {
            line1: '32 Birch Lane',
            line2: 'London'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Olivia Martin',
        image: doc8,
        speciality: 'General_physician',
        degree: 'MBBS',
        experience: '9 Years',
        about: 'Dr. Martin provides primary care services, focusing on preventive medicine and lifestyle management.',
        fees: 55,
        address: {
            line1: '14 Willow Drive',
            line2: 'Oxford'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Benjamin Scott ',
        image: doc9,
        speciality: 'Gynecologist',
        degree: 'MD',
        experience: '12 Years',
        about: 'Dr. Scott is dedicated to reproductive health and patient education, ensuring a holistic approach to women’s wellness.',
        fees: 85,
        address: {
            line1: '60 Cedar Street',
            line2: 'Cambridge'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Isabella Clark',
        image: doc10,
        speciality: 'Gastroenterologist',
        degree: 'MD',
        experience: '11 Years',
        about: 'Dr. Clark specializes in liver and digestive diseases, offering modern diagnostic and therapeutic solutions.',
        fees: 95,
        address: {
            line1: '88 Aspen Road',
            line2: 'Manchester'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Alexander Wilson ',
        image: doc11,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Wilson ensures comprehensive care for children, focusing on early detection and preventive healthcare.',
        fees: 65,
        address: {
            line1: '21 Poplar Avenue',
            line2: 'Bristol'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Henry Robinson',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MD',
        experience: '8 Years',
        about: 'Dr. Robinson provides expert care for neurological conditions with an emphasis on innovative treatments and patient support.',
        fees: 110,
        address: {
            line1: '99 Chestnut Street',
            line2: 'Leeds'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Grace Turner',
        image: doc13,
        speciality: 'Dermatologist',
        degree: 'MD',
        experience: '7 Years',
        about: 'Dr. Turner specializes in cosmetic and medical dermatology, providing personalized skin care for every patient.',
        fees: 80,
        address: {
            line1: '12 Magnolia Lane',
            line2: 'London'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Hana Harris',
        image: doc14,
        speciality: 'General_physician',
        degree: 'MBBS',
        experience: '5 Years',
        about: 'Dr. Harris provides primary healthcare services, focusing on chronic disease management and preventive medicine.',
        fees: 50,
        address: {
            line1: '34 Fir Street',
            line2: 'Oxford'
        }
    },
    {
        _id: doc15,
        name: 'Dr. Ava King',
        image: 'doc15',
        speciality: 'Gynecologist',
        degree: 'MD',
        experience: '9 Years',
        about: 'Dr. King is dedicated to women’s reproductive health, focusing on safe and effective treatments with compassion.',
        fees: 90,
        address: {
            line1: '56 Spruce Avenue',
            line2: 'Cambridge'
        }
    }
];
