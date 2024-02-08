if [ ! -d "supabase/docker" ]; then
  # Get the code
  git clone --depth 1 https://github.com/supabase/supabase
fi

# Go to the docker folder
cd supabase/docker

# Copy the fake env vars
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

# Start the services (in detached mode)
docker compose up -d --remove-orphans

cd ../..