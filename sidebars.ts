import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Preface',
      collapsible: true,
      collapsed: false,
      items: ['preface/intro'],
    },
    {
      type: 'category',
      label: 'Physical AI',
      collapsible: true,
      items: ['physical-ai/index'],
    },
    {
      type: 'category',
      label: 'ROS2',
      collapsible: true,
      items: ['ros2/index'],
    },
    {
      type: 'category',
      label: 'Digital Twins',
      collapsible: true,
      items: ['digital-twins/index'],
    },
    {
      type: 'category',
      label: 'Nvidia Isaac',
      collapsible: true,
      items: ['nvidia-isaac/index'],
    },
    {
      type: 'category',
      label: 'Humanoid Robotics',
      collapsible: true,
      items: ['humanoid-robotics/index'],
    },
    {
      type: 'category',
      label: 'VLA Agents',
      collapsible: true,
      items: ['vla/index'],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      collapsible: true,
      items: ['capstone/index'],
    },
  ],
};

export default sidebars;

