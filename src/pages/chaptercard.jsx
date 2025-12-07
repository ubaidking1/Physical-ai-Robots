import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

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

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="Learn to build intelligent physical systems with ROS 2, simulation, and AI models"
    >
      {/* HERO SECTION */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.heroTitle}>
            {siteConfig.title}
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

          <Link
            className={styles.heroButton}
            to="/docs/chapter-1-introduction-to-physical-ai"
          >
            Get Started →
          </Link>
        </div>

        {/* Hero Image */}
        <img
          src="/img/humanoid.png"
          alt="Humanoid Robot"
          className={styles.heroImage}
        />
      </header>

      {/* CHAPTER CARDS */}
      <main>
        <section className={styles.chapters}>
          <div className="container">
            <h2 className={styles.sectionTitle}>Course Chapters</h2>

            <div className={styles.grid}>
              {chapters.map((chapter) => (
                <Link key={chapter.path} to={chapter.path} className={styles.card}>
                  <span>{chapter.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
