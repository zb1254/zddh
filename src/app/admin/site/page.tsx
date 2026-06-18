'use client'

import { useEffect, useState, type ComponentType } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { Input } from "@/registry/new-york/ui/input"
import { Button } from "@/registry/new-york/ui/button"
import { useToast } from "@/registry/new-york/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs"
import { Icons } from "@/components/icons"
import { Textarea } from "@/registry/new-york/ui/textarea"
import {
  Plus, Trash2, Github, HelpCircle, Puzzle, MonitorPlay, Send, Globe, ExternalLink,
  Link2, Mail, MessageCircle, BookOpen, Download, Share2,
  Heart, Star, Bell, Sun, Moon, Zap,
  Music, Film, Camera, Video,
  Settings, User, Search, Home, Info,
  ArrowRight, ChevronRight, Check, ChevronsUpDown
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/new-york/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/registry/new-york/ui/form"
import { SiteConfigService} from "@/services/siteConfigService"
import type { SiteConfig } from "@/types/site"
import { Toaster } from "@/registry/new-york/ui/toaster"

const headerLinkSchema = z.object({
  icon: z.string().min(1, { message: "请输入图标名称" }),
  href: z.string().min(1, { message: "请输入链接地址" }),
  ariaLabel: z.string().min(1, { message: "请输入链接描述" }),
})

const formSchema = z.object({
  basic: z.object({
    title: z.string().min(2, {
      message: "标题至少需要2个字符.",
    }),
    description: z.string().min(10, {
      message: "描述至少需要10个字符.",
    }),
    keywords: z.string(),
  }),
  appearance: z.object({
    logo: z.string().regex(/^(https?:\/\/|\/)\S+$/i, {
      message: "请输入有效的URL地址或相对路径",
    }),
    favicon: z.string().regex(/^(https?:\/\/|\/)\S+$/i, {
      message: "请输入有效的URL地址或相对路径",
    }),
    theme: z.enum(['light', 'dark', 'system']),
  }),
  navigation: z.object({
    linkTarget: z.enum(['_blank', '_self']),
  }),
  headerLinks: z.array(headerLinkSchema),
})

export default function SiteSettings() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basic: {
        title: "",
        description: "",
        keywords: "",
      },
      appearance: {
        logo: "",
        favicon: "",
        theme: "system",
      },
      navigation: {
        linkTarget: "_blank",
      },
      headerLinks: [],
    },
  })

  useEffect(() => {
    const loadConfig = async () => {
      const siteConfigService = new SiteConfigService();
      const config = await siteConfigService.getSiteConfig();
      if (config) {
        form.reset({ ...config, headerLinks: config.headerLinks || [] });
      }
    }
    loadConfig()
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const siteConfigService = new SiteConfigService();
      await siteConfigService.updateSiteConfig(values);
      toast({
        title: "成功",
        description: "站点信息已保存",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "保存失败",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="space-y-6">
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">基本信息</TabsTrigger>
            <TabsTrigger value="appearance">外观设置</TabsTrigger>
            <TabsTrigger value="navigation">导航设置</TabsTrigger>
            <TabsTrigger value="headerLinks">页头链接</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>基本信息</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="basic.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>网站标题</FormLabel>
                          <FormControl>
                            <Input placeholder="输入网站标题" {...field} />
                          </FormControl>
                          <FormDescription>
                            这将显示在浏览器标签页和搜索结果中
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basic.description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>网站描述</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="输入网站描述"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            这将显示在搜索结果中
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="basic.keywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>关键词</FormLabel>
                          <FormControl>
                            <Input placeholder="输入关键词，用英文逗号分隔" {...field} />
                          </FormControl>
                          <FormDescription>
                            用于搜索引擎优化，多个关键词请用英文逗号分隔
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-start">
                      <Button 
                        type="submit"
                        className="w-[120px]"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            保存中
                          </>
                        ) : (
                          <>
                            <Icons.save className="mr-2 h-4 w-4" />
                            保存更改
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>外观设置</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="appearance.logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo URL</FormLabel>
                          <FormControl>
                            <Input placeholder="输入Logo图片URL" {...field} />
                          </FormControl>
                          <FormDescription>
                            建议尺寸: 160x64px
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="appearance.favicon"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Favicon URL</FormLabel>
                          <FormControl>
                            <Input placeholder="输入网站图标URL" {...field} />
                          </FormControl>
                          <FormDescription>
                            建议尺寸: 32x32px
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-start">
                      <Button 
                        type="submit"
                        className="w-[120px]"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            保存中
                          </>
                        ) : (
                          <>
                            <Icons.save className="mr-2 h-4 w-4" />
                            保存更改
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="navigation">
            <Card>
              <CardHeader>
                <CardTitle>导航设置</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="navigation.linkTarget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>链接打开方式</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="选择链接打开方式" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="_blank">新窗口打开 (_blank)</SelectItem>
                              <SelectItem value="_self">当前窗口打开 (_self)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            设置首页中点击网站链接时的打开方式，默认为新窗口打开
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-start">
                      <Button 
                        type="submit"
                        className="w-[120px]"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            保存中
                          </>
                        ) : (
                          <>
                            <Icons.save className="mr-2 h-4 w-4" />
                            保存更改
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="headerLinks">
            <Card>
              <CardHeader>
                <CardTitle>页头链接</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <HeaderLinksField control={form.control} />
                    <div className="flex justify-start">
                      <Button 
                        type="submit"
                        className="w-[120px]"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (
                          <>
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            保存中
                          </>
                        ) : (
                          <>
                            <Icons.save className="mr-2 h-4 w-4" />
                            保存更改
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </>
  )
}

const ICON_OPTIONS = [
  "Github", "Puzzle", "HelpCircle", "Globe", "MonitorPlay", "Send", "ExternalLink",
  "Link2", "Mail", "MessageCircle", "BookOpen", "Download", "Share2",
  "Heart", "Star", "Bell", "Sun", "Moon", "Zap",
  "Music", "Film", "Camera", "Video",
  "Settings", "User", "Search", "Home", "Info",
  "ArrowRight", "ChevronRight"
]

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Github, Puzzle, HelpCircle, Globe, MonitorPlay, Send, ExternalLink,
  Link2, Mail, MessageCircle, BookOpen, Download, Share2,
  Heart, Star, Bell, Sun, Moon, Zap,
  Music, Film, Camera, Video,
  Settings, User, Search, Home, Info,
  ArrowRight, ChevronRight
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const Icon = iconMap[value]

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <span className="flex items-center gap-2">
              {Icon && <Icon className="h-4 w-4" />}
              <span>{value}</span>
            </span>
          ) : (
            "选择图标"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            placeholder="搜索或输入图标名..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>
              {search && (
                <CommandItem
                  value={search}
                  onSelect={() => {
                    onChange(search)
                    setOpen(false)
                  }}
                >
                  <span>使用 "{search}"</span>
                </CommandItem>
              )}
            </CommandEmpty>
            <CommandGroup>
              {ICON_OPTIONS.map((name) => {
                const IconComp = iconMap[name]
                return (
                  <CommandItem
                    key={name}
                    value={name}
                    onSelect={(currentValue) => {
                      onChange(currentValue)
                      setOpen(false)
                    }}
                  >
                    {IconComp && <IconComp className="mr-2 h-4 w-4 shrink-0" />}
                    <span>{name}</span>
                    {value === name && <Check className="ml-auto h-4 w-4" />}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function HeaderLinksField({ control }: { control: any }) {
  const { fields, append, remove } = useFieldArray({ control, name: "headerLinks" })

  return (
    <div className="space-y-4">
      <FormDescription>
        配置顶部导航栏右侧的图标链接。
      </FormDescription>
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-start gap-2 p-3 border rounded-lg">
          <div className="flex-1 space-y-2">
            <FormField
              control={control}
              name={`headerLinks.${index}.icon`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>图标</FormLabel>
                  <FormControl>
                    <IconPicker value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`headerLinks.${index}.href`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>链接地址</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name={`headerLinks.${index}.ariaLabel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>描述</FormLabel>
                  <FormControl>
                    <Input placeholder="访问 GitHub 仓库" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="button" variant="ghost" size="icon" className="mt-6 shrink-0" onClick={() => remove(index)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={() => append({ icon: "", href: "", ariaLabel: "" })}>
        <Plus className="h-4 w-4 mr-2" />
        添加链接
      </Button>
    </div>
  )
}
