import { Injectable } from '@angular/core';
import { Achievement, Role } from '../models/about.model';
import { CapstoneProject, CraftProject } from '../models/project.model';
import { Service } from '../models/service.model';
import { SkillItem } from '../models/skill.model';
import { ACHIEVEMENTS, ROLES } from '../data/about';
import { CAPSTONE_PROJECTS, CRAFT_PROJECTS } from '../data/projects';
import { SERVICES } from '../data/services';
import { LANGUAGES, TOOLS } from '../data/skills-tools';

/** Single source for all site content, so components never import raw data files. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly services: readonly Service[] = SERVICES;
  readonly capstoneProjects: readonly CapstoneProject[] = CAPSTONE_PROJECTS;
  readonly craftProjects: readonly CraftProject[] = CRAFT_PROJECTS;
  readonly languages: readonly SkillItem[] = LANGUAGES;
  readonly tools: readonly SkillItem[] = TOOLS;
  readonly roles: readonly Role[] = ROLES;
  readonly achievements: readonly Achievement[] = ACHIEVEMENTS;

  service(id: string): Service | undefined {
    return this.services.find((s) => s.id === id);
  }

  project(slug: string): CapstoneProject | undefined {
    return this.capstoneProjects.find((p) => p.slug === slug);
  }

  projectsBySlugs(slugs: readonly string[]): CapstoneProject[] {
    return slugs
      .map((slug) => this.project(slug))
      .filter((p): p is CapstoneProject => !!p);
  }
}
