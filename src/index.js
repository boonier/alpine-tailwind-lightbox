import html from './template.html'

export default function (Alpine) {
    const defaultGroup = (Math.random() + 1).toString(36).substring(7)

    Alpine.store('lightbox', {
        show: {},
        items: {},
        touchStart: null,

        onTouchStart(event) {
            if (!event.changedTouches) {
                this.touchStart = null

                return
            }

            this.touchStart = event.changedTouches[0]
        },
        onTouchEnd(event, group) {
            if (!event.changedTouches || !this.touchStart) return

            const { screenX: startX, screenY: startY } = this.touchStart
            const { screenX: endX, screenY: endY } = event.changedTouches[0]

            if (!startX || !startY || !endX || !endY) return

            const horizontalDiff = startX - endX
            const verticalDiff = startY - endY

            if (Math.abs(horizontalDiff) < Math.abs(verticalDiff)) return

            if (horizontalDiff >= 100) {
                this.next(group)
            } else if (horizontalDiff <= -100) {
                this.prev(group)
            }
        },
        prev(group) {
            const current = this.items[group].findIndex((item) => item.el === this.show[group].el)

            this.show[group] = current === 0
                ? this.items[group][this.items[group].length - 1]
                : this.items[group][current - 1]
        },
        next(group) {
            const current = this.items[group].findIndex((item) => item.el === this.show[group].el)

            this.show[group] = current === this.items[group].length - 1
                ? this.items[group][0]
                : this.items[group][current + 1]
        },
    })

    Alpine.directive('lightbox', (el, { modifiers, expression }, { effect, evaluateLater }) => {
        if (!expression) {
            console.warn('Alpine warn: no url or config expression passed to x-lightbox', el)

            return
        }

        const evaluateConfig = evaluateLater(expression)

        effect(() => {
            evaluateConfig((config) => {
                const group = config.group ? String(config.group) : defaultGroup

                if (!document.querySelector(`#lightbox-${group}`)) {
                    const template = document.createElement('template')
                    template.innerHTML = html

                    const templateEl = template.content.children[0]
                    templateEl.id = `lightbox-${group}`
                    templateEl.setAttribute('x-data', `{ group: '${group}' }`)

                    document.body.appendChild(templateEl)
                }

                if (Alpine.store('lightbox').show[group] === undefined) Alpine.store('lightbox').show[group] = null

                Alpine.store('lightbox').items[group] ??= [];

                const items = Alpine.store('lightbox').items
                const index = Alpine.store('lightbox').items[group]?.findIndex((item) => item.el === el)
                const data = mergeConfig(config, group, el)

                if (index !== -1 && index !== undefined) {
                    items[group][index] = data
                } else {
                    items[group].push(data)
                }

                el.addEventListener('click', (event) => {
                    event.preventDefault()

                    Alpine.store('lightbox').show[group] = Alpine.store('lightbox')
                        .items[group]
                        .find((item) => item.el === el)
                })
            })
        })
    })
}

const mergeConfig = (config, group, el) => {
    if (typeof config === 'string') config = { url: config }

    return { el, type: 'image', ...config, group: group }
}
