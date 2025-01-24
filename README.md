## Slider

Анимированный слайдер на базе NextTS, с использованием TypeScript и Tailwind CSS. Слайдер поддерживает цикличное переключение слайдов, управление стрелками, навигацию с помощью точек и автоматическую прокрутку.

Запускается проект командой npm run start (предварительно соберите проект командой npm run build).

**Особенности**
- Отображение нескольких слайдов одновременно (по умолчанию — 4 слайда).
- Цикличное переключение вперёд и назад.
- Навигация с помощью точек внизу слайдера.
- Автоматическое переключение каждые 5 секунд.
- Анимация переходов между слайдами.

**Принцип работы**
- Перелистывание слайдов реализовано с использованием свойства transform: translateX() для смещения контейнера со слайдами.
- Состояние currentIndex отвечает за положение текущего активного слайда.
- Навигация по точкам и стрелкам обновляет currentIndex, что приводит к обновлению translateX и сдвигу контейнера.
- Цикличность: при достижении последнего слайда currentIndex сбрасывается на начало, а при перелистывании назад с первого слайда — переходит к последнему.
- Анимация: плавность достигается за счёт свойства CSS transition.

**Дополнительно**
- Можно изменить количество одновременно отображаемых слайдов, изменив значение переменной slidesPerPage.
- Анимация переключения слайдов настраивается через класс transition-transform в Tailwind CSS.
- Также реализовано определение типа устройства.
