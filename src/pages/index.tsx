// src/pages/index.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

import ChatWidget from '../components/chatwidget'; // lowercase to match file
import VideoPlayer from '../components/VideoPlayer';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="Learn to build intelligent physical systems with ROS 2, simulation, and AI models"
    >
      {/* Hero Section */}
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/physical-ai"
            >
              Get Started →
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  Table of Contents
                </h2>
              </div>
            </div>

            {/* Chapters Row 1 */}
            <div className="row">
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 1</h3></div>
                  <div className="card__body">
                    <p><strong>Introduction to Physical AI</strong></p>
                    <p>Learn the fundamentals of AI systems that interact with the physical world.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/physical-ai">Read Chapter →</Link>
                  </div>
                </div>
              </div>

              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 2</h3></div>
                  <div className="card__body">
                    <p><strong>Basics of Humanoid Robotics</strong></p>
                    <p>Explore mechanical design, actuators, sensors, and control systems.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/humanoid-robotics">Read Chapter →</Link>
                  </div>
                </div>
              </div>

              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 3</h3></div>
                  <div className="card__body">
                    <p><strong>ROS 2 Fundamentals</strong></p>
                    <p>Master the industry-standard framework for robot software development.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/ros2">Read Chapter →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Chapters Row 2 */}
            <div className="row">
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 4</h3></div>
                  <div className="card__body">
                    <p><strong>Digital Twin Simulation</strong></p>
                    <p>Use Gazebo and Isaac Sim to test robots in virtual environments.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/digital-twins">Read Chapter →</Link>
                  </div>
                </div>
              </div>

              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 5</h3></div>
                  <div className="card__body">
                    <p><strong>Vision-Language-Action Systems</strong></p>
                    <p>Build AI models that understand vision, language, and generate actions.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/vision-language-action-systems">Read Chapter →</Link>
                  </div>
                </div>
              </div>

              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header"><h3>Chapter 6</h3></div>
                  <div className="card__body">
                    <p><strong>Capstone Project</strong></p>
                    <p>Integrate all concepts to build a complete AI-robot pipeline.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/capstone">Read Chapter →</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Hackathon Demo Video */}
            <div style={{ marginTop: '4rem', textAlign: 'center' }}>
              <h2>Panaversity Hackathon Demo</h2>
              <VideoPlayer
                src="/videos/Ai-video.mp4"
                width="800px"
                className="mb-10"
              />
            </div>
          </div>
        </section>
      </main>

 {/* Chat Widget at the bottom */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '4rem 0' }}>
        <ChatWidget backendUrl="http://localhost:8000/api/chat" />
      </div>
    </Layout>
  );
}
