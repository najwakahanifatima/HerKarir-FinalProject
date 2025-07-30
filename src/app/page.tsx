import Image from "next/image";
import { ModuleList } from "@/components/ModuleLists";
import { ModuleLearning } from "@/components/ModuleLearning";
import { AssessmentCard, AssessmentCardProps } from "@/components/AssessmentCard";

const dummyModuleList = [
    "Getting started",
    "3D Modeling Fundamentals",
    "Modeling for 3D Printing",
    "Modeling for Laser Cutting",
    "Parametric Product Modeling",
    "Final Project, Remaining Features + Conclusion",
]

const dummyModuleLearning = {
  title: "3D Modeling for 3D Printing and Laser Cutting on Fusion 360",
  institution: "Packt",
  modulesName: [
    "Getting started",
    "3D Modeling Fundamentals",
    "Modeling for 3D Printing",
    "Modeling for Laser Cutting",
    "Parametric Product Modeling",
    "Final Project, Remaining Features + Conclusion",
  ],
  modulesDescription: [
    "In this module, we will explore the foundational aspects of 3D design and laser cutting. You will learn how to download and install the Fusion 360 software and gain familiarity with its user interface. This section provides the essential setup and orientation for beginners starting their journey into 3D modeling.",
    "In this module, we will dive into essential 3D modeling techniques, starting with the creation of a chair and progressing through platonic solids like the octahedron and dodecahedron. You'll learn how to use technical drawings to model a bench and refine your designs using arcs, patterns, and constraints. This section lays a solid foundation for understanding 3D object construction.",
    "In this module, we will explore the nuances of designing models specifically for 3D printing. You will learn how to account for material strength, tolerances, and cost, as well as create practical objects like a phone charging station and Allen key. Additionally, this section introduces advanced techniques for designing 3D-printed boxes with secure closures.",
    "In this module, we will explore the fundamentals of laser cutting, beginning with an introduction to parametric modeling and progressing to hands-on projects such as designing a laser-cut lamp and box. You will also learn how to export models to a dxf file and apply finishing touches like patterns and handles for functional use.",
    "In this module, we will delve into parametric product modeling, a powerful design approach where object dimensions are driven by variables. You'll learn how to create a parametric box by defining key parameters and explore the broader potential of this technique in product design, enabling flexibility and customization.",
    "In this module, we will complete the course by designing a 3D-printed hinge, which involves creating multiple parts that interact. You'll also explore the remaining features of 3D modeling, including rendering your final designs. The section concludes with a recap and closing remarks from the instructor.",
  ],
  modulesDuration: [
    "21 minutes",
    "1 hour",
    "51 minutes",
    "1 hour",
    "44 minutes",
    "2 hours",
  ],
}

const dummyAssessment : AssessmentCardProps = {
  title: 'Pre-Test: Assess Your PM Readiness',
  module: 'Product Management',
  questions: [
    'User feedback and data should be a key input when making product decisions.',
    'The more features a product has, the better its product-market fit.',
    'Scrum and Agile are development frameworks that Product Managers often work within.',
    'User personas are created primarily based on internal stakeholder assumptions.',
    'A high churn rate is a positive indicator of product-market fit.',
  ],
  correctAnswers: [
    'True',
    'True',
    'False',
    'True',
    'False',
  ],
  isSubmitted: false,
  score: 0,
}

export default function Home() {
  return (
    <div className="font-sans">
      <main className="flex flex-col">
        <AssessmentCard {...dummyAssessment} />
        <ModuleList modulesName={dummyModuleList}/>
        <ModuleLearning {...dummyModuleLearning} />
      </main>
    </div>
  );
}
