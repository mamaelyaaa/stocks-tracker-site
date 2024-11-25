import io

import matplotlib.pyplot as plt
import pandas as pd


def preprocessing(data, company: str):
    time_series = data['Time Series (Daily)']
    df = pd.DataFrame.from_dict(time_series, orient='index')
    df.columns = ['open', 'high', 'low', 'close', 'volume']
    df['date'] = df.index

    # Преобразование типов
    df['date'] = pd.to_datetime(df['date'])
    df = df.astype({'open': float, 'high': float, 'low': float, 'close': float, 'volume': float})

    # Сортировка по дате
    df = df.sort_values(by='date').reset_index(drop=True)
    df['date'] = pd.to_datetime(df['date'])

    # Построение графика
    plt.figure(figsize=(12, 8))
    plt.plot(df['date'], df['close'], color='mediumspringgreen', marker='o', markersize=5, linestyle='-', linewidth=2,
             label='Цена закрытия')

    # Настройка оси X
    plt.gca().xaxis.set_major_locator(plt.MaxNLocator(10))  # Ограничение числа меток по оси X
    plt.gcf().autofmt_xdate()  # Автоматический поворот меток для удобства чтения

    # Подписи и заголовок
    plt.title(f'Закрытые цены акций {company.upper()}', fontsize=16, fontweight='bold')
    plt.xlabel('Дата', fontsize=12)
    plt.ylabel('Цена закрытия (USD)', fontsize=12)

    # Сетка и диапазон
    plt.grid(True, which='both', linestyle='--', linewidth=0.5)
    plt.ylim(df['close'].min() * 0.95, df['close'].max() * 1.05)  # Добавление 5% запаса сверху и снизу

    # Заливка под графиком
    plt.fill_between(df['date'], df['close'], color='mediumaquamarine', alpha=0.3)

    # Легенда
    plt.legend(loc='upper left')

    # Оптимизация расположения графика
    plt.tight_layout()

    plot_image = io.BytesIO()
    plt.savefig(plot_image, format='png')
    plt.close()
    plot_image.seek(0)

    with open(f"src/graphic/{company}.png", "wb") as f:
        f.write(plot_image.read())
    plot_image.seek(0)

    return plot_image
