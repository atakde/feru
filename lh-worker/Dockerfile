FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies and curl in one step, keep apt lists
RUN apt-get update && apt-get install -y \
    wget \
    curl \
    gnupg \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-6 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxext6 \
    libxfixes3 \
    libxkbcommon0 \
    libgtk-3-0 \
    libgbm1 \
    libpango-1.0-0 \
    libatspi2.0-0 \
    libcurl4 \
    libvulkan1 \
    libudev1 \
    xdg-utils \
    --no-install-recommends

# Download and install Google Chrome stable
RUN curl -o /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb && \
    apt-get install -y /tmp/google-chrome-stable_current_amd64.deb && \
    rm /tmp/google-chrome-stable_current_amd64.deb

# Clean up apt cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js 18.x
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get update && apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Verify installations
RUN google-chrome-stable --version && node -v && npm -v

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

CMD ["node", "runner.js"]
