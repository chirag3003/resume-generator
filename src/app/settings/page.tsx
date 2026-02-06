"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, FileText, User, Settings2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfileStore } from "@/lib/store/useUserProfileStore";
import { useDashboardStore } from "@/lib/store/useDashboardStore";
import { AISettingsForm } from "@/components/settings/AISettingsForm";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  const { profile, context, updateProfile, updateContext } =
    useUserProfileStore();

  // Local state for forms
  const [localProfile, setLocalProfile] = useState(profile);
  const [localContext, setLocalContext] = useState(context);

  // Sync with store on mount
  useEffect(() => {
    setLocalProfile(profile);
    setLocalContext(context);
  }, [profile, context]);

  const handleSaveProfile = () => {
    updateProfile(localProfile);
    toast.success("Profile defaults saved successfully");
  };

  const handleSaveContext = () => {
    updateContext(localContext);
    toast.success("AI context saved successfully");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>Profile Defaults</span>
            </TabsTrigger>
            <TabsTrigger value="context" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Global Context</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>AI Configuration</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Defaults</CardTitle>
                <CardDescription>
                  Save your personal details here to auto-fill future resumes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={localProfile.fullName || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={localProfile.email || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          email: e.target.value,
                        })
                      }
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={localProfile.phone || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={localProfile.location || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          location: e.target.value,
                        })
                      }
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={localProfile.website || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          website: e.target.value,
                        })
                      }
                      placeholder="portfolio.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={localProfile.linkedin || ""}
                      onChange={(e) =>
                        setLocalProfile({
                          ...localProfile,
                          linkedin: e.target.value,
                        })
                      }
                      placeholder="linkedin.com/in/johndoe"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveProfile} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Context Tab */}
          <TabsContent value="context">
            <Card>
              <CardHeader>
                <CardTitle>Global AI Context</CardTitle>
                <CardDescription>
                  Provide a master summary and skills list. The AI will use this
                  context to generate more personalized content for you.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="masterSummary">
                    Master Professional Summary
                  </Label>
                  <Textarea
                    id="masterSummary"
                    value={localContext.summary || ""}
                    onChange={(e) =>
                      setLocalContext({
                        ...localContext,
                        summary: e.target.value,
                      })
                    }
                    placeholder="e.g. Senior Full Stack Developer with 8 years of experience building scalable web applications..."
                    className="min-h-[150px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    Tip: Be detailed! Mention your years of experience, key
                    achievements, and primary tech stack.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="masterSkills">Technical Skills List</Label>
                  <Textarea
                    id="masterSkills"
                    value={localContext.skills || ""}
                    onChange={(e) =>
                      setLocalContext({
                        ...localContext,
                        skills: e.target.value,
                      })
                    }
                    placeholder="e.g. React, TypeScript, Node.js, AWS, PostgreSQL, Docker, Kubernetes..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customInstructions">
                    Custom AI Instructions
                  </Label>
                  <Textarea
                    id="customInstructions"
                    value={localContext.custom || ""}
                    onChange={(e) =>
                      setLocalContext({
                        ...localContext,
                        custom: e.target.value,
                      })
                    }
                    placeholder="e.g. Always use active voice. Focus on metrics and impact. Keep bullet points concise."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button onClick={handleSaveContext} className="gap-2">
                    <Save className="h-4 w-4" />
                    Save Context
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Config Tab */}
          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>
                  Manage your AI provider settings and API keys.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AISettingsForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
