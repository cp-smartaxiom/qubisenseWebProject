import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  showBackToTop = false;
  openFaqId: string | null = 'problems';

  readonly faqLeftItems: Array<{ id: string; question: string; answer: string }> = [
    {
      id: 'problems',
      question: 'What problems is QubiSense designed to solve',
      answer:
        'QubiSense addresses delayed decision-making in complex operations. It helps organizations detect risks early, act locally, and reduce losses from latency, fragmented visibility, and manual escalation.'
    },
    {
      id: 'different',
      question: 'How is QubiSense different from traditional cloud-based AI platforms',
      answer:
        'Most platforms centralize data before acting on it. QubiSense distributes AI to the edge, allowing decisions to be made where data is generated, even when connectivity is limited or unreliable.'
    },
    {
      id: 'replace',
      question: 'Does QubiSense replace existing operational systems',
      answer:
        'No. QubiSense complements existing ERP, WMS, fleet management, and monitoring systems. It integrates through APIs and enhances decision-making without requiring system replacement.'
    },
    {
      id: 'outages',
      question: 'How does the platform perform during network outages',
      answer:
        'Edge nodes continue to process data and execute decisions locally. Insights are synchronized once connectivity is restored, ensuring continuity without operational disruption.'
    },
    {
    id: 'impact',
    question: 'How quickly can organizations see a measurable impact',
    answer:
    'Most deployments deliver measurable improvements within weeks, including faster response times, lower losses, and improved operational reliability.'
    },
  ];

  readonly faqRightItems: Array<{ id: string; question: string; answer: string }> = [
    {
      id: 'enterprises',
      question: 'Is QubiSense suitable for large, distributed enterprises',
      answer:
        'Yes. The platform is designed for scale, supporting multi-location, multi-asset operations across regions while maintaining consistent control and governance.'
    },
    {
      id: 'compliance',
      question: 'How does QubiSense handle compliance and audit requirements',
      answer:
        'All decisions, alerts, and actions are automatically logged. This creates auditable records that support regulatory compliance without manual reporting.'
    },
    {
      id: 'industries',
      question: 'Can the platform adapt to different industries and use case',
      answer:
        'The core Distributed AI architecture remains consistent, while intelligence models, workflows, and integrations are tailored to industry-specific requirements.'
    },
    {
      id: 'security',
      question: 'How is data security managed across edge and cloud layers',
      answer:
        'Security is embedded across devices, communication, and data storage. This includes device authentication, encrypted data exchange, and controlled access to insights.'
    },
    {
      id: 'engagement',
      question: 'What does a typical engagement with QubiSense look like',
      answer:
        'Engagements usually begin with an assessment of where decision latency creates risk. Deployments then focus on targeted use cases, followed by progressive expansion across operations.'
    }
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showBackToTop = window.scrollY > 200;
  }

  toggleFaq(id: string): void {
    this.openFaqId = this.openFaqId === id ? null : id;
  }

  isFaqOpen(id: string): boolean {
    return this.openFaqId === id;
  }

  trackByFaqId(_index: number, item: { id: string }): string {
    return item.id;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollToContact(): void {
    const contactSection = document.getElementById('contact-us');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  }
}