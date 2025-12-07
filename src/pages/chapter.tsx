import React from 'react';
import Link from '@docusaurus/Link';
import styles from './chapters.module.css';

const chapters = [
  { title: 'Preface', path: '/docs/preface/intro' },
  { title: 'Physical AI', path: '/docs/physical-ai' },
  { title: 'ROS2', path: '/docs/ros2' },
  { title: 'Digital Twins', path: '/docs/digital-twins' },
  { title: 'Nvidia Isaac', path: '/docs/nvidia-isaac' },
  { title: 'Humanoid Robotics', path: '/docs/humanoid-robotics' },
  { title: 'VLA Agents', path: '/docs/vla' },
  { title: 'Capstone Project', path: '/docs/capstone' },
];

export default function Chapters() {
  return (
    <div className={styles.container}>
      <h1>Course Chapters</h1>
      <div className={styles.grid}>
        {chapters.map((chapter) => (
          <Link key={chapter.path} to={chapter.path} className={styles.card}>
            {chapter.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
