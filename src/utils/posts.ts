// src/utils/posts.ts

export interface PostMeta {
    title: string
    date: string
    slug: string
    component: any
    type?: 'post' | 'page' // 👈 新增类型标记
}

const modules = import.meta.glob('../posts/*.md', { eager: true })
const rawModules = import.meta.glob('../posts/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
}) as Record<string, string>

// 先解析出所有模块的元数据
const allModules: PostMeta[] = Object.keys(modules).map((path) => {
    const mod = modules[path] as any
    const rawContent = rawModules[path]

    let title = ''
    let date = ''
    let type: 'post' | 'page' = 'post'      // 👈 默认为文章
    let customSlug = ''                       // 👈 自定义 slug

    if (rawContent && typeof rawContent === 'string') {
        const tMatch = rawContent.match(/^title:\s*(.+)$/m)
        const dMatch = rawContent.match(/^date:\s*(.+)$/m)
        const typeMatch = rawContent.match(/^type:\s*(.+)$/m)   // 👈 提取 type
        const slugMatch = rawContent.match(/^slug:\s*(.+)$/m)   // 👈 提取 slug

        if (tMatch) title = tMatch[1].trim()
        if (dMatch) date = dMatch[1].trim()
        if (typeMatch) type = typeMatch[1].trim() as 'post' | 'page'
        if (slugMatch) customSlug = slugMatch[1].trim()
    }

    // 兜底标题
    if (!title) {
        const fileName = path.split('/').pop()?.replace('.md', '') || 'unknown'
        title = fileName.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    }

    // 优先使用 YAML 中的 slug，否则用文件名
    const fileName = path.split('/').pop()?.replace('.md', '') || ''
    const finalSlug = customSlug || fileName
    // 在 map 函数的 return 之前加上这行
    console.log(`[Debug] ${fileName} | type="${type}" | slug="${finalSlug}" | rawHasType=${!!rawContent?.includes('type:')}`)
    return {
        title,
        date,
        slug: finalSlug,
        component: mod.default,
        type
    }
})

// ✅ 文章列表：仅包含 type === 'post'，按日期倒序
export const allPosts = allModules
    .filter(p => p.type === 'post')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

// ✅ 页面集合：包含 about 等非文章页面
export const pages = allModules.filter(p => p.type === 'page')