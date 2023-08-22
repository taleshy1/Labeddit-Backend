-- Active: 1692639359361@@127.0.0.1@3306-- Active: 1690566185172@@127.0.0.1@3306

CREATE TABLE
    users(
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(date('now', 'localtime'))
    );

CREATE TABLE
    posts(
        id TEXT UNIQUE PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        comments INTEGER NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT(date('now', 'localtime')),
        updated_at TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    comments(
        id TEXT UNIQUE PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        like INTEGER NOT NULL,
        dislike INTEGER NOT NULL,
        created_at TEXT DEFAULT(date('now', 'localtime')),
        updated_at TEXT NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE
    like_dislike_comments(
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (comment_id) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        "d40f66ba-1c8f-477b-a522-c87b98064005",
        "Admin",
        "admin@email.com",
        "$2a$12$1XyCZdhqIilauHzzzcNWX.WZOl4kWYfOBlQfXpdybxw4AdDDds.E6",
        "Admin"
    );

-- Este usuario acima possui as seguintes credenciais:

-- email: admin@email.com

-- password: LabookAdmin123!