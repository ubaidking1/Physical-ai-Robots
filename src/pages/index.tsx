import React, { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import ChatWidget from '../components/chatwidget'; // <-- import here
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import VideoPlayer from '../components/VideoPlayer';
export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="Learn to build intelligent physical systems with ROS 2, simulation, and AI models"
    >
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

            {/* Row 1 */}
            <div className="row">
              {/* Chapter 1 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 1</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>Introduction to Physical AI</strong></p>
                    <p>Learn the fundamentals of AI systems that interact with the physical world.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/physical-ai">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapter 2 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 2</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>Basics of Humanoid Robotics</strong></p>
                    <p>Explore mechanical design, actuators, sensors, and control systems.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/humanoid-robotics">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapter 3 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 3</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>ROS 2 Fundamentals</strong></p>
                    <p>Master the industry-standard framework for robot software development.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/ros2">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              {/* Chapter 4 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 4</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>Digital Twin Simulation</strong></p>
                    <p>Use Gazebo and Isaac Sim to test robots in virtual environments.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/digital-twins">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapter 5 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 5</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>Vision-Language-Action Systems</strong></p>
                    <p>Build AI models that understand vision, language, and generate actions.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/vision-language-action-systems">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Chapter 6 */}
              <div className="col col--4">
                <div className="card margin-bottom--lg">
                  <div className="card__header">
                    <h3>Chapter 6</h3>
                  </div>
                  <div className="card__body">
                    <p><strong>Capstone Project</strong></p>
                    <p>Integrate all concepts to build a complete AI-robot pipeline.</p>
                  </div>
                  <div className="card__footer">
                    <Link to="/docs/capstone">
                      Read Chapter →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

{/* Signup & Signin Forms */}
<div style={{ marginTop: '4rem', textAlign: 'center' }}>
  <h2>Panaversity Hackathon Demo</h2>
  <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
    <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
      <h3>Sign Up</h3>
      <SignupForm />
    </div>
    <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
      <h3>Sign In</h3>
      <SigninForm />
    </div>
  </div>
</div>


          </div>
        </section>
      </main>

      {/* Add the Chat Widget at the bottom */}
      <ChatWidget />
    </Layout>
  );
}

{
  (
<div style={{ padding: '2rem' }}>
      <h1>Panaversity Hackathon Demo</h1>

      <h2>Signup</h2>
      <SignupForm />

      <h2>Signin</h2>
      <SigninForm />

      

    </div>
  );
}
{(
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Panaversity Hackathon Demo</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Explore Physical AI and Humanoid Robotics with our interactive demo video below.
      </p>

      {/* Video Section */}
      <VideoPlayer src="/videos/Physical AI & Humanoid Robotics.mp4" width="800px" className="mb-10" />

      {/* Example: SignUp / SignIn Cards */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
          <h3 className="text-xl font-semibold mb-4 text-center">Sign Up</h3>
          {/* <SignupForm /> */}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
          <h3 className="text-xl font-semibold mb-4 text-center">Sign In</h3>
          {/* <SigninForm /> */}
        </div>
      </div>
    </div>
)}