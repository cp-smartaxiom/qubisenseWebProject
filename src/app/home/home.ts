import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environment';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  showBackToTop = false;
  openFaqId: string | null = 'problems';
  showIndustrySection = false;

  selectedIndustry = 'logistics';
  conversationForm!: FormGroup;
  isSubmitted: boolean = false;
  //http: any;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.conversationForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  get f() {
    return this.conversationForm.controls;
  }

  onSubmit() {
    if (this.conversationForm.invalid) {
      this.conversationForm.markAllAsTouched();
      return;
    }

    const formData = this.conversationForm.value;
    this.http.post(`${environment.apiUrl}/send-mail`, formData)
      .subscribe({
        next: (res: any) => {
          console.log('Mail Sent Successfully');
          this.conversationForm.reset();
          this.isSubmitted = true;
        },
        error: (err: any) => {
          console.error('Mail Error:', err);
        }
      });
  }
 

  industries: any = {
    logistics: {
      first: {
        title: 'Cold Chain Monitoring',
        description: 'Real-time tracking of temperature, humidity, and location for perishable shipments. Local alerts and automated corrective actions help reduce spoilage by up to 40 percent while supporting compliance.'
      },
      second: {
        title: 'Fleet Management',
        description: 'Real-time tracking of temperature, humidity, and location for perishable shipments. Local alerts and automated corrective actions help reduce spoilage by up to 40 percent while supporting compliance.'
      }
    },

    manufacturing: {
      first: {
        title: 'Predictive Maintenance ',
        description: 'Sensors detect equipment anomalies and forecast failures before they occur, minimizing downtime and protecting production schedules. '
      },
      second: {
        title: 'Safety and Compliance Monitoring',
        description: 'Automated monitoring of environmental and worker safety conditions with instant alerts and continuous documentation.'
      }
    },

    utilities: {
      first: {
        title: 'Smart Grid and Energy Monitoring',
        description: 'Distributed sensors detect faults and optimize energy usage locally, improving resilience and reducing outages. '
      },
      second: {
        title: 'Water Quality Monitoring ',
        description: 'Edge AI analyzes treatment facility data in real time, triggering alerts and automated responses to contamination events. '
      }
    },

    healthcare: {
      first: {
        title: 'Asset Tracking and Compliance',
        description: 'Real-time monitoring of medical equipment and pharmaceutical assets to ensure safety and regulatory adherence.'
      },
      second: {
        title: 'Patient and Facility Monitoring ',
        description: 'Edge devices track patient vitals and facility conditions, enabling rapid intervention and secure data handling. '
      }
    },

    emergency: {
      first: {
        title: 'Incident Coordination ',
        description: 'Real-time coordination of personnel, vehicles, and equipment with decentralized decision-making for faster response.'
      },
      second: {
        title: 'Environmental Hazard Detection ',
        description: 'Detection of hazardous conditions such as gas leaks or fires, with automated safety protocols to reduce risk.'
      }
    }
  };

  industryContent: any = {
    // is done
    manufacturing: {
      title: 'Reduce Equipment Downtime with AI-Driven Predictive Maintenance',
      lead: `In manufacturing and industrial automation, unplanned downtime is one of the most expensive operational risks. Industry studies estimate that unplanned downtime costs industrial manufacturers billions annually, with large facilities losing thousands of dollars per minute during production interruptions. QubiSense applies Distributed AI to detect failure signals early and convert them into timely maintenance decisions.  `,
      subtitle: 'How Predictive Maintenance Becomes an Operational Advantage ',
      paragraph: `Machines continuously generate vibration, temperature, acoustic, and electrical signals. QubiSense captures and analyzes this data at the edge, enabling real-time predictive maintenance decisions rather than waiting for centralized processing delays. `,
      leftTitle: 'Instead of reacting to breakdowns, manufacturers gain early visibility into: ',
      leftPoints: [
        'Bearing wear and imbalance detected through spectral vibration analysis', 

'Motor overheating and electrical anomalies identified through current monitoring ',
'Alignment drift and mechanical stress flagged before failure thresholds ',
'Abnormal usage patterns that accelerate component degradation '
      ],
      rightTitle: 'By embedding Distributed AI directly into production environments, organizations can achieve measurable improvements:',
      rightPoints: [
        'Up to 30 percent reduction in unplanned downtime',
        '20 to 40 percent lower maintenance costs through condition-based servicing',
        'Extended asset life by reducing unnecessary part replacements',
        'Automated compliance documentation and maintenance logs',
'        Improved overall equipment effectiveness through earlier intervention '
      ],
      footnote: `Maintenance teams shift from calendar-based servicing to condition-driven action...`,
      footnote1: `QubiSense enables manufacturers to move from reactive repair cycles to proactive performance management,
delivering the competitive edge required in modern supply chains`,
      buttonText: 'Reclaim control over downtime'
    },
    // is done text
    logistics: {
      title: 'Increase Fleet Uptime Before Breakdowns Disrupt Deliveries ',
      lead: `In logistics and supply chain operations, a single vehicle breakdown can ripple across routes, customer commitments, and operating margins. QubiSense applies Distributed AI to fleet management, enabling Predictive Maintenance that protects uptime before failures occur. `,
      subtitle: 'From Scheduled Servicing to Condition-Driven Control ',
      paragraph: `Traditional fleet maintenance relies on mileage thresholds or fixed service intervals. These models ignore real-world driving conditions, load variations, and environmental stress. The result is either premature servicing or unexpected breakdowns.QubiSense embeds intelligence directly within fleet and equipment environments through onboard vibration sensors and OBD II engine telematics. High-frequency engine and shock data are processed by distributed AI models that distinguish normal wear from early-failure indicators. `      ,
      leftTitle: 'What this enables operationally:',
      leftPoints: [
        'Detection of bearing wear and engine misfires weeks before breakdown ',
        'Real - time analysis of vibration signatures and engine parameters ',
        'Automated risk scoring of vehicles across the fleet ',
        'Predictive alerts integrated directly into WMS and ERP systems ',
        'Automatic generation of maintenance work orders aligned with service schedules ',
        'Fleet managers gain visibility into which vehicles require intervention and why, not just when.'
      ],
      rightTitle: 'The business impact for logistics and supply chain organizations is measurable: ',
      rightPoints: [
        'Reduction in unexpected vehicle downtime ',
        'Improved on-time delivery performance ',
        'Lower emergency repair costs ',
        'Optimized spare parts planning and inventory ',
        'Higher asset utilization across distributed fleets '
      ],
      footnote: `By shifting from reactive repair to Predictive Maintenance, logistics leaders reduce service failures that erode customer trust and inflate operating costs. Fleet management shifts from responding to breakdowns to maintaining performance continuity across complex delivery networks. `,
      footnote1: `For organizations evaluating how Distributed AI can stabilize fleet operations at scale, the opportunity lies in identifying where unplanned downtime originates and preventing it before it spreads.`,
      buttonText: 'Strengthen fleet reliability at scale'
    },
    utilities: {
      title: 'Extend Cold Chain Shelf Life Before Spoilage Impacts Revenue',
      lead: `In cold chain logistics, temperature deviations can damage goods...`,
      subtitle: 'From Temperature Monitoring to Shelf-Life Intelligence',
      paragraph: `Traditional cold chain monitoring systems alert teams after temperature thresholds are breached...`,
      leftTitle: 'What changes operationally:',
      leftPoints: [
        'Continuous sub-degree temperature tracking across multi-carrier routes',
        'Real-time calculation of remaining Cold Chain Shelf Life',
        'Early identification of cumulative thermal exposure risk',
        'Automated alerts before spoilage thresholds are breached',
        'Edge caching to prevent data gaps in low connectivity environments',
        'Audit-ready PDF and CSV compliance reports for FDA and FSMA standards'
      ],
      rightTitle: 'The business impact is measurable:',
      rightPoints: [
        'Spoilage incidents reduced by 30 percent within six months',
        'Regulatory compliance improved through automated documentation',
        'Delivery-related customer complaints were virtually eliminated',
        'Greater trust with healthcare partners and improved profitability'
      ],
      footnote: `Cold chain monitoring becomes more than compliance tracking...`,
      footnote1: `QubiSense enables manufacturers to move from reactive repair cycles to proactive performance management,
delivering the competitive edge required in modern supply chains`,
      buttonText: 'Protect product integrity and revenue'
    },
// is done text
    healthcare: {
      title: ' Extend Cold Chain Shelf Life Before Spoilage Impacts Revenue',
      lead: `In cold chain logistics, temperature deviations can damage goods. It erodes margins, trust, and compliance standing. QubiSense uses Distributed AI to predict and protect Cold Chain Shelf Life before losses occur. `,
      subtitle: 'From Temperature Monitoring to Shelf-Life Intelligence',
      paragraph: `Traditional cold chain monitoring systems alert teams after temperature thresholds are breached. By then, product quality may already be compromised. QubiSense shifts the model from reactive alerts to predictive control. 
Using ruggedized trackers equipped with ±0.5°C precision sensors, the platform continuously captures temperature and humidity data across transit legs, warehouses, and transfer points. Instead of simply logging readings, Distributed AI applies time-temperature integration models at the edge to calculate remaining shelf life in real time. This enables logistics and supply chain leaders to move from visibility to foresight. `,
      leftTitle: 'What changes operationally:',
      leftPoints: [
        'Continuous sub-degree temperature tracking across multi-carrier routes',
        'Real-time calculation of remaining Cold Chain Shelf Life',
        'Early identification of cumulative thermal exposure risk',
        'Automated alerts before spoilage thresholds are breached',
        'Edge caching to prevent data gaps in low connectivity environments',
        'Audit-ready PDF and CSV compliance reports for FDA and FSMA standards'
      ],
      rightTitle: 'The business impact is measurable:',
      rightPoints: [
        'Spoilage incidents reduced by 30 percent within six months',
        'Regulatory compliance improved through automated documentation',
        'Delivery-related customer complaints were virtually eliminated',
        'Greater trust with healthcare partners and improved profitability'
      ],
      footnote: `Cold chain monitoring becomes more than compliance tracking...`,
      footnote1: `QubiSense enables manufacturers to move from reactive repair cycles to proactive performance management,
delivering the competitive edge required in modern supply chains`,
      buttonText: 'Protect product integrity and revenue'
    },
// is done
    emergency: {
      title: ' Accelerate Life-Saving Decisions Before Minutes Become Consequences ',
      lead: `In emergency response, coordination delays cost more than efficiency; they cost outcomes. QubiSense uses Distributed AI to strengthen incident coordination from field response through facility handoff, enabling faster alignment, structured triage, and resilient communication. `,
      subtitle: 'From Fragmented Response to Structured, Edge-Assisted Coordination',
      paragraph: `Emergency Services and Public Safety environments operate under pressure, limited bandwidth, and fragmented communication channels. QubiSense transforms incident coordination by embedding intelligence directly into frontline devices and response gateways. 
      Let's consider a scenario where a patient is suffering from a stroke. Imagine if paramedics transmitted live body-cam video and patient vitals through an edge-enabled gateway. Distributed AI processes speech patterns, vital signs, and environmental signals locally before escalation. Instead of waiting for centralized review, structured triage insights are generated in real time. `,
      leftTitle: 'What happens operationally: ',
      leftPoints: [
        'Speech irregularities such as slurred words and delayed responses flagged through edge - based speech analysis ',

'Blood pressure spikes and ECG trends are analyzed instantly through onboard anomaly detection ',

'Automatic creation of a secure coordination room connecting paramedic, neurologist, and ER charge nurse ',

'Structured triage checklist generated and shared before patient arrival ',

'PHI - aware redaction applied locally before media transmission ',

'Local transcription stored at hospital edge nodes rather than public cloud environments '
      ],
      rightTitle: 'Connectivity resilience is built into the workflow: ',
      rightPoints: [
        'Assured uplink requested dynamically to stabilize video during critical minutes ',

'Device location verification confirms proximity to stroke - ready facilities ',

'Intelligent path switching between 5G and hospital Wi - Fi to maintain continuity ',

'Voice prioritization when bandwidth drops '
      ],
      footnote: `The measurable impact centers on coordination speed and reliability: 

Under 60 seconds from alert to specialist engagement 
Continuous communication despite network handovers 
Automated structured handoff created before ER arrival 
Reduced verbal repetition and miscommunication during transfer `,
      footnote1: `Incident coordination shifts from reactive communication to orchestrated alignment. Distributed AI does not replace clinical judgment. It accelerates collaboration, strengthens signal clarity, and ensures that frontline insights reach decision-makers without delay. For public safety and healthcare leaders evaluating operational resilience, the opportunity lies in asking a simple question: how much faster could critical teams align if intelligence operated directly within the response environment? `,
      buttonText: 'Strengthen response when every second matters'
    }

  };



































  toggleIndustrySection() {
    this.showIndustrySection = !this.showIndustrySection;
  }

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