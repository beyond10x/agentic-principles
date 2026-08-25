import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import PrincipleCatalog from '@site/src/components/PrincipleCatalog';
import {usePrinciples} from '@site/src/data/principles';

import styles from './index.module.css';

const method = [
  ['01', 'Ask', 'Name the decision and the question that could change it.'],
  ['02', 'Compare', 'Record a hypothesis and at least one credible alternative.'],
  ['03', 'Test', 'Choose evidence, boundaries, and stopping conditions in advance.'],
  ['04', 'Challenge', 'Seek counterexamples and prove the evaluator can catch failure.'],
  ['05', 'Apply', 'Hand products a scoped claim and an experiment that can disprove it.'],
];

const domains = [
  {
    number: '01',
    title: 'Software factories',
    text: 'How autonomous systems plan, change, verify, integrate, and release software without hiding uncertainty behind throughput.',
    signal: 'Build · verify · release',
  },
  {
    number: '02',
    title: 'SRE agents',
    text: 'How agents reason about live state, contain failures, preserve rollback, and know when an uncertain dependency is a stop boundary.',
    signal: 'Observe · contain · recover',
  },
  {
    number: '03',
    title: 'Customer operations',
    text: 'How automation handles authorization, private context, outbound effects, escalation, and the cost of misplaced confidence.',
    signal: 'Authorize · act · account',
  },
];

function SafeFrontier(): ReactNode {
  return (
    <aside
      className={styles.frontier}
      aria-label="Example of safe progress when one tool fails">
      <div className={styles.frontierTop}>
        <span>EXAMPLE / ONE TOOL FAILED</span>
        <span className={styles.pulse}>publishing offline</span>
      </div>
      <div className={styles.frontierBody}>
        <div className={styles.frontierLabel}>Work that remains safe</div>
        <div className={`${styles.task} ${styles.complete}`}>
          <span>01</span>
          <strong>Validate local evidence</strong>
          <em>complete</em>
        </div>
        <div className={`${styles.task} ${styles.complete}`}>
          <span>02</span>
          <strong>Checkpoint research state</strong>
          <em>complete</em>
        </div>
        <div className={`${styles.task} ${styles.blocked}`}>
          <span>03</span>
          <strong>Publish remote artifact</strong>
          <em>deferred</em>
        </div>
        <div className={styles.boundary}>
          <span>STOP WHEN EVIDENCE RUNS OUT</span>
          <p>Do not continue consequential work when authority, freshness, or observability is unknown.</p>
        </div>
      </div>
    </aside>
  );
}

export default function Home(): ReactNode {
  const {principles} = usePrinciples();
  const candidateCount = principles.filter(
    (principle) => principle.maturity === 'candidate',
  ).length;
  const seedCount = principles.filter(
    (principle) => principle.maturity === 'seed',
  ).length;

  return (
    <Layout
      title="Evidence for agents that do real work"
      description="Evidence-backed principles for safe and efficient agentic work automation across software factories, SRE, and customer operations.">
      <main>
        <header className={styles.hero}>
          <div className={styles.heroGlow} />
          <div className={`container ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrow}>
                <span /> Evidence-led research
              </div>
              <Heading as="h1">Research for AI agents that do real work.</Heading>
              <p className={styles.lede}>
                We study failures, run experiments, and analyze standards to find practical
                rules for software, SRE, and customer-service agents—without pretending
                early ideas are settled facts.
              </p>
              <div className={styles.actions}>
                <Link className={styles.primaryAction} to="/principles">
                  See what we know <span aria-hidden="true">↗</span>
                </Link>
                <Link className={styles.secondaryAction} to="/research">
                  Start with the reader’s guide
                </Link>
              </div>
              <div className={styles.metrics} aria-label="Registry summary">
                <div>
                  <strong>{principles.length}</strong>
                  <span>active claims</span>
                </div>
                <div>
                  <strong>{candidateCount}</strong>
                  <span>candidate backed by a study</span>
                </div>
                <div>
                  <strong>{seedCount}</strong>
                  <span>early ideas that need testing</span>
                </div>
              </div>
            </div>
            <SafeFrontier />
          </div>
        </header>

        <section className={styles.thesis}>
          <div className="container">
            <p className={styles.sectionLabel}>Why this exists</p>
            <Heading as="h2">
              Automation should earn trust with evidence, not confident language.
            </Heading>
            <div className={styles.thesisGrid}>
              <p>
                Agents can plan, use tools, and change external state. That freedom is useful,
                but it can also amplify a bad assumption, exceed authority, or hide failure
                behind a plausible report.
              </p>
              <p>
                This project preserves the work behind every claim: what was observed, what
                was inferred, what could prove it wrong, and how it might change a real
                engineering decision.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.featured}>
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionLabel}>What we know so far</p>
                <Heading as="h2">Start with the strongest evidence.</Heading>
              </div>
              <Link to="/principles">View all {principles.length} →</Link>
            </div>
            <PrincipleCatalog featuredOnly />
          </div>
        </section>

        <section className={styles.method} id="method">
          <div className="container">
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.sectionLabel}>How the research works</p>
                <Heading as="h2">How an idea becomes a useful rule.</Heading>
              </div>
              <p className={styles.methodIntro}>
                We compare explanations before testing, keep observations separate from
                interpretation, and show the next test most likely to change our mind.
              </p>
            </div>
            <ol className={styles.methodSteps}>
              {method.map(([number, title, text]) => (
                <li key={number}>
                  <span>{number}</span>
                  <Heading as="h3">{title}</Heading>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.domains} id="domains">
          <div className="container">
            <p className={styles.sectionLabel}>Where this should help</p>
            <Heading as="h2">Built for work with real consequences.</Heading>
            <div className={styles.domainGrid}>
              {domains.map((domain) => (
                <article key={domain.number}>
                  <span className={styles.domainNumber}>{domain.number}</span>
                  <Heading as="h3">{domain.title}</Heading>
                  <p>{domain.text}</p>
                  <strong>{domain.signal}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.closing}>
          <div className={`container ${styles.closingInner}`}>
            <div>
              <p className={styles.sectionLabel}>Follow the evidence</p>
              <Heading as="h2">Every claim links back to the work.</Heading>
            </div>
            <div className={styles.closingAction}>
              <p>
                Read the question, competing explanations, source material, experiment,
                limitations, and the evidence label in one navigable trail.
              </p>
              <Link className={styles.primaryAction} to="/research">
                Browse the research <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
