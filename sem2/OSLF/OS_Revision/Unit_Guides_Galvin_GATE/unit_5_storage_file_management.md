# Unit 5: Mass Storage and File Management

Lectures covered: 30-32  
Syllabus weightage: 9%  
Galvin alignment: Mass-storage structure, file-system interface, and file-system implementation.

## 1. Unit Target

By the end of this unit, you should be able to:

- Explain disk structure and disk attachment.
- Calculate disk head movement for scheduling algorithms.
- Compare FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK.
- Understand disk management basics.
- Explain file attributes, access methods, directory structures, and protection.
- Compare contiguous, linked, and indexed allocation.
- Explain free-space management.
- Recognize important Linux file commands and system calls.

## Official Lecture Breakdown

| Lectures | Official handout topic | Covered below |
|---:|---|---|
| 30-31 | Mass storage overview, disk structure, disk attachment, disk scheduling, disk management | sections 3-14 and 26-28 |
| 32 | File allocation methods, free-space management | sections 20-22 and 26-28 |
| Lab support | File attributes, access methods, directory structures, protection, file commands, file system calls | sections 15-19 and 23-25 |

## 2. Mental Model

Storage management answers:

```text
How is data stored permanently?
How should pending disk I/O requests be ordered?
How does OS organize files and directories?
How are disk blocks allocated to files?
How does OS track free disk blocks?
```

This unit is lower weightage than memory/scheduling, but it gives direct MCQ marks.

## 3. Disk Structure

Traditional magnetic disk terms:

| Term | Meaning |
|---|---|
| Platter | circular disk surface |
| Track | circular path on disk surface |
| Sector | smallest addressable unit on track |
| Cylinder | same track number across all platters |
| Disk arm | moves read/write head |
| Disk head | reads/writes data |

Disk access time components:

| Component | Meaning |
|---|---|
| Seek time | time to move head to correct cylinder |
| Rotational latency | time for desired sector to rotate under head |
| Transfer time | time to transfer data |

MCQ trap:

- Disk scheduling mainly reduces seek time/head movement.
- Rotational latency depends on disk rotation.

## 4. Disk Attachment

Disk may be connected as:

| Type | Meaning |
|---|---|
| Host-attached storage | directly attached to system through I/O ports/controllers |
| Network-attached storage | accessed over network |
| Storage-area network | dedicated high-speed storage network |

MCQ-level point:

- NAS is file-level network storage.
- SAN is block-level dedicated storage network.

## 5. Disk Scheduling Basics

Disk scheduling decides the order of disk I/O requests.

Goal:

- Minimize total head movement.
- Improve average response time.
- Improve throughput.

Formula:

```text
Head movement = |current head position - next request|
Total head movement = sum of all movements
Average seek movement = total head movement / number of requests
```

## 6. FCFS Disk Scheduling

FCFS = First Come First Serve.

Rule:

- Serve requests in exact arrival order.

Advantages:

- Simple.
- Fair.
- No starvation.

Disadvantages:

- Can cause large head movement.
- Poor performance for scattered requests.

Example method:

```text
Head = 53
Queue = 98, 183, 37

Movement = |98-53| + |183-98| + |37-183|
         = 45 + 85 + 146
         = 276
```

## 7. SSTF Disk Scheduling

SSTF = Shortest Seek Time First.

Rule:

- Serve request closest to current head.

Advantages:

- Usually less movement than FCFS.

Disadvantages:

- Can cause starvation for far requests.
- Greedy local choice may not be globally optimal.

GATE trick:

- At every step, recalculate nearest request from current head.

## 8. SCAN Disk Scheduling

SCAN is also called elevator algorithm.

Rule:

- Head moves in one direction serving requests.
- Goes to physical end of disk.
- Reverses direction.

If disk range is `0 to 199`, initial head `53`, direction high:

```text
serve requests > 53 in increasing order
go to 199
reverse
serve lower requests in decreasing order
```

MCQ trap:

- SCAN goes to physical end even if no request is at the end.

## 9. C-SCAN Disk Scheduling

C-SCAN = Circular SCAN.

Rule:

- Head moves in one direction only.
- After reaching one end, jumps to other end.
- Continues in same direction.

Advantage:

- More uniform waiting time than SCAN.

MCQ trap:

- In C-SCAN, service is only in one direction.
- The return jump is counted in many total head movement questions if physical movement is considered. Follow question convention/options.

## 10. LOOK Disk Scheduling

LOOK is like SCAN, but:

- Head does not go to physical end.
- It only goes as far as last request in that direction.

MCQ clue:

```text
LOOK looks for last request, not disk end.
```

## 11. C-LOOK Disk Scheduling

C-LOOK is circular LOOK.

Rule:

- Serve in one direction until last request.
- Jump to first request on other side.
- Continue same direction.

Difference from C-SCAN:

- C-SCAN goes to physical disk end.
- C-LOOK goes only to last request.

## 12. Disk Scheduling Summary

| Algorithm | Rule | Starvation? | Key clue |
|---|---|---|---|
| FCFS | arrival order | no | simplest/fair |
| SSTF | nearest request | possible | greedy shortest seek |
| SCAN | to end, reverse | low | elevator |
| C-SCAN | one direction, end-to-start jump | low | circular elevator |
| LOOK | to last request, reverse | low | does not go to physical end |
| C-LOOK | one direction, last-to-first request jump | low | circular LOOK |

## 13. Disk Scheduling Solving Method

For any problem:

1. Write request queue.
2. Write initial head position.
3. Write disk range.
4. Write initial direction if required.
5. Sort requests.
6. Decide service order using algorithm.
7. Add absolute differences.

Common mistakes:

- Forgetting disk end in SCAN/C-SCAN.
- Adding disk end in LOOK/C-LOOK when not required.
- Not recalculating nearest in SSTF.
- Not following initial direction.

## 14. Disk Management

Important ideas:

| Concept | Meaning |
|---|---|
| Low-level formatting | divides disk into sectors |
| Partitioning | divides disk into logical parts |
| Logical formatting | creates file system |
| Boot block | contains code needed to boot OS |
| Bad block management | handles defective disk blocks |

MCQ clue:

- Logical formatting creates file-system structures.
- Boot block helps load OS.

## 15. File Concept

A file is a named collection of related information stored on secondary storage.

File attributes:

| Attribute | Meaning |
|---|---|
| Name | human-readable file name |
| Identifier | unique internal tag/number |
| Type | file type |
| Location | pointer to file location |
| Size | current file size |
| Protection | access permissions |
| Time/date/user | creation, modification, ownership info |

## 16. File Operations

Common operations:

- Create.
- Open.
- Read.
- Write.
- Reposition/seek.
- Delete.
- Truncate.
- Close.

Open-file table:

- OS keeps information about currently open files.

File pointer:

- Tracks current read/write position.

## 17. File Access Methods

| Access method | Meaning | Example use |
|---|---|---|
| Sequential access | read/write in order | text processing |
| Direct/random access | jump to any block/record | databases |
| Indexed access | index points to records/blocks | indexed files |

MCQ trap:

- Sequential access is simple but not ideal for random record lookup.
- Direct access supports random access.

## 18. Directory Structures

| Structure | Meaning | Pros/Cons |
|---|---|---|
| Single-level | one directory for all files | simple but name conflicts |
| Two-level | separate directory per user | avoids user name conflicts |
| Tree-structured | hierarchical directories | common and scalable |
| Acyclic graph | sharing allowed, no cycles | supports shared files |
| General graph | cycles possible | needs garbage collection/cycle handling |

Path types:

| Type | Meaning |
|---|---|
| Absolute path | starts from root |
| Relative path | starts from current directory |

## 19. File Protection

Protection controls access.

Common operations controlled:

- read
- write
- execute
- append
- delete
- list

Linux permission model:

```text
owner group others
rwx   rwx   rwx
```

Example:

```text
chmod 755 file
```

Meaning:

```text
owner = 7 = rwx
group = 5 = r-x
others = 5 = r-x
```

Permission values:

```text
r = 4
w = 2
x = 1
```

## 20. File Allocation Methods

### Contiguous Allocation

File occupies consecutive disk blocks.

Advantages:

- Simple.
- Fast sequential and direct access.
- Only start block and length needed.

Disadvantages:

- External fragmentation.
- File growth is difficult.

MCQ clue:

- Consecutive blocks = contiguous allocation.

### Linked Allocation

Each file is a linked list of disk blocks.

Each block points to next block.

Advantages:

- No external fragmentation.
- File can grow easily.

Disadvantages:

- Poor direct/random access.
- Pointer overhead.
- Reliability issue if pointer lost.

MCQ clue:

- Good sequential access, bad random access.

### Indexed Allocation

Each file has an index block containing addresses of all file blocks.

Advantages:

- Supports direct access.
- No external fragmentation.

Disadvantages:

- Index block overhead.
- Large files may need linked/multilevel indexes.

MCQ clue:

- Index block stores pointers to file blocks.

## 21. Allocation Comparison

| Method | Sequential access | Direct access | Fragmentation | Growth |
|---|---|---|---|---|
| Contiguous | excellent | excellent | external | difficult |
| Linked | good | poor | none external | easy |
| Indexed | good | good | none external | depends on index size |

## 22. Free-Space Management

OS must track free disk blocks.

### Bit Vector / Bitmap

One bit per block.

Example:

```text
1 = free, 0 = allocated
```

or reverse depending on convention.

Advantages:

- Simple.
- Easy to find contiguous free blocks using bit operations.

Disadvantages:

- Bitmap may be large.

### Linked List

Free blocks linked together.

Advantages:

- Simple.
- No large bitmap needed.

Disadvantages:

- Hard to find contiguous free space.
- Requires traversal.

### Grouping

First free block stores addresses of several free blocks.

Advantage:

- Faster access to multiple free blocks than simple linked list.

### Counting

Store:

```text
starting free block + count of consecutive free blocks
```

Works well when free blocks occur in runs.

## 23. Linux File Commands

| Command | Use |
|---|---|
| `diff` | line-by-line file comparison |
| `cmp` | byte-by-byte comparison |
| `comm` | compare sorted files line by line |
| `chmod` | change permissions |
| `chown` | change owner |
| `ln` | create hard/symbolic link |
| `mount` | attach file system |
| `df` | show free disk space |
| `du` | show disk usage |

Tricks:

- `df` = disk free.
- `du` = disk usage.
- `chmod` changes mode/permissions.
- `chown` changes owner.
- `diff` gives detailed differences; `cmp` tells byte-level difference.

## 24. Linux File System Calls

| System call | Use |
|---|---|
| `open()` | open file |
| `read()` | read data |
| `write()` | write data |
| `close()` | close file |
| `lseek()` | move file pointer |
| `stat()` | get file status/info |

MCQ trap:

- `lseek()` changes current file offset; it does not read or write by itself.
- `stat()` returns metadata.

## 25. High-Yield Differences

### `diff` vs `cmp` vs `comm`

| Command | Difference |
|---|---|
| `diff` | line-by-line differences |
| `cmp` | byte-by-byte comparison |
| `comm` | compares sorted files and shows common/unique lines |

### Hard Link vs Symbolic Link

| Hard link | Symbolic link |
|---|---|
| points to same inode | points to pathname |
| cannot usually link directories | can link directories in many systems |
| does not break if original filename removed | breaks if target path removed |

### `df` vs `du`

| `df` | `du` |
|---|---|
| free space of file systems | space used by files/directories |
| disk-level view | file/directory-level view |

## 26. GATE-Level Problem Types

### Type 1: Total Head Movement

Given:

```text
queue, head, disk range, direction, algorithm
```

Find:

```text
service order and total movement
```

Trick:

- For SSTF, sort only for convenience; actual selection is nearest from current head.
- For SCAN/C-SCAN, include disk ends.
- For LOOK/C-LOOK, include only requests.

### Type 2: File Allocation Identification

Question says:

```text
start block and length
```

Answer:

- contiguous allocation.

Question says:

```text
each block points to next
```

Answer:

- linked allocation.

Question says:

```text
index block contains all block addresses
```

Answer:

- indexed allocation.

### Type 3: Permission Calculation

Example:

```text
chmod 754
```

Meaning:

```text
owner: 7 = rwx
group: 5 = r-x
others: 4 = r--
```

### Type 4: Free Space Method

Question says:

```text
one bit per disk block
```

Answer:

- bitmap/bit vector.

Question says:

```text
start block plus number of consecutive blocks
```

Answer:

- counting.

## 27. Common Mistakes

1. Adding disk end in LOOK.
2. Forgetting disk end in SCAN.
3. Treating SSTF as sorted order.
4. Confusing seek time and rotational latency.
5. Saying linked allocation supports efficient direct access.
6. Forgetting contiguous allocation causes external fragmentation.
7. Confusing `df` and `du`.
8. Saying `lseek()` reads data.
9. Forgetting permission values: read 4, write 2, execute 1.

## 28. Quick Revision Box

- Disk scheduling reduces seek/head movement.
- FCFS is fair but inefficient.
- SSTF selects nearest request but can starve.
- SCAN = elevator, goes to disk end.
- LOOK stops at last request.
- C-SCAN/C-LOOK move circularly in one direction.
- Contiguous allocation is fast but has external fragmentation.
- Linked allocation has no external fragmentation but poor random access.
- Indexed allocation supports direct access using index block.
- Bitmap uses one bit per block.
- `df` shows disk free; `du` shows disk usage.
- `chmod`: r=4, w=2, x=1.

## 29. Practice Prompts

1. Solve disk head movement for FCFS, SSTF, SCAN, C-SCAN, LOOK, and C-LOOK.
2. Compare SCAN and LOOK.
3. Explain why SSTF can starve requests.
4. Compare contiguous, linked, and indexed file allocation.
5. Explain bitmap and counting free-space management.
6. Convert permission `764` into `rwx` form.
7. Differentiate `diff`, `cmp`, and `comm`.
8. Explain the purpose of `open`, `read`, `write`, `close`, `lseek`, and `stat`.
